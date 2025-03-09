import { makeAutoObservable } from 'mobx';
import { UserData, AlertsStore, createAlert } from '@shared/model';
import { AuthService } from '@shared/api';
import { authChannel, setupAuthChannelListener } from './AuthChannel';
import { broadcastRequestWithFallback, waitForCondition } from '@shared/lib';
import { nanoid } from 'nanoid';

export class AuthStore {
  isInit = false;
  user = {} as UserData;
  isLoading = false;
  isModalOpen = false;
  currentTime: number = Date.now();
  isLeader = false;
  private LEADER_TIMEOUT = 3000;
  private tabId = nanoid();
  private alertsStore: AlertsStore;

  constructor(alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    makeAutoObservable(this);
    setupAuthChannelListener(this);
    window.addEventListener('beforeunload', () => {
      const leaderData = JSON.parse(localStorage.getItem('leader') || '{}') ;
      if (leaderData && leaderData.id === this.tabId) {
        localStorage.removeItem('leader');
        sessionStorage.removeItem('refreshing');
        this.setLeader(false);
      }
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'leader' && !event.newValue) {
        setTimeout(async () => {
          if (this.currentTime - JSON.parse(localStorage.getItem('leader') || '{"id": "", "time": 0}').time > this.LEADER_TIMEOUT) {
            console.log('get leader after leader left');
            localStorage.setItem('leader', JSON.stringify({id: this.tabId, time: Date.now()}));
            this.setLeader(true);
            this.refresh();
            const hbInterval = setInterval(() => {
              // if (!this.isLeader) {
              //   console.log('heartbeat stopped');
              //   clearInterval(hbInterval);
              // }
              console.log('heartbeat');
              const now = Date.now();
              const leaderData = JSON.parse(localStorage.getItem('leader') || '{}') ;
              if (leaderData && leaderData.id === this.tabId) {
                const updatedLeader = {
                  id: this.tabId,
                  time: now
                }
                localStorage.setItem('leader', JSON.stringify(updatedLeader));
              }
            }, this.LEADER_TIMEOUT - 1000);
          } else {
            console.log('not won leader, so request auth');
            authChannel.postMessage({type: 'request_auth'});
            await waitForCondition(() => this.isInit);
          }
        }, Math.random() * 1000);
      }
    });
  }

  get isAuth() {
    return !!this.user?.id;
  }

  get resendCooldown() {
    if (!this.user.nextResendAt) return 0;
    const seconds = Math.floor((Date.parse(this.user.nextResendAt) - this.currentTime) / 1000);
    if (seconds <= 0) return 0;
    return seconds;
  }

  setInit(bool: boolean) {
    this.isInit = bool;
  }

  setUser(user: UserData) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setModalOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  setLeader(bool: boolean) {
    this.isLeader = bool;
  }

  updateCurrentTime() {
    this.currentTime = Date.now();
  }

  async login(email: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.userDto);
      this.setModalOpen(false);
      authChannel.postMessage(
        {type: 'login', payload: {...this.user}}
      );
      if (!this.user.isActivated) {
      this.alertsStore.addAlert(
        createAlert(
          'Ваш аккаунт не активирован, проверьте вашу почту! Если письмо не пришло или ссылка не работает, повторите запрос в личном кабинете.', 'warning',
          10000
        )
      );
      }
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    } finally {
      this.setLoading(false);
    }
  }

  async registration(email: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.userDto);
      this.setModalOpen(false);
      authChannel.postMessage(
        {type: 'login', payload: {...this.user}}
      );
      this.alertsStore.addAlert(
        createAlert(
          `Регистрация прошла успешно. На вашу почту ${response.data.userDto.email} отправлено письмо для подтверждения.`, 
          'warning'
        )
      );
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token');
      this.setUser({} as UserData);
      authChannel.postMessage({type: 'logout'});
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    }
  }

  async resend() {
    this.setLoading(true);
    try {
      const response = await AuthService.resend();
      this.updateCurrentTime();
      this.setUser(response.data.userDto);
      this.alertsStore.addAlert(createAlert(`На вашу почту ${this.user.email} отправлено письмо для подтверждения.`, 'info'));
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    } finally {
      this.setLoading(false);
    }
  }

  async refresh() {
    if (!sessionStorage.getItem('refreshing')) {
      console.log('refresh');
      try {
        sessionStorage.setItem('refreshing', 'true');
        const response = await AuthService.refresh();
        localStorage.setItem('token', response.data.accessToken);
        this.setUser(response.data.userDto);
        if (!this.user.isActivated) {
          this.alertsStore.addAlert(
            createAlert(
              'Ваш аккаунт не активирован, проверьте вашу почту! Если письмо не пришло или ссылка не работает, повторите запрос в личном кабинете.',
              'warning',
              10000
            )
          );
        }
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      } finally {
        sessionStorage.removeItem('refreshing');
      }
    } else {
      await waitForCondition(() => !sessionStorage.getItem('refreshing'));
      this.refresh();
    }
  }

  async checkAuth() {
    this.setLoading(true);
    console.log(this.tabId);
    try {
      if (!localStorage.getItem('token')) {
        this.setInit(true);
        return;
      };
      
      await broadcastRequestWithFallback(
        authChannel,
        'ping',
        'pong',
        async () => {
          if (this.currentTime - JSON.parse(localStorage.getItem('leader') || '{"id": "", "time": 0}').time > this.LEADER_TIMEOUT) {
            setTimeout(async () => {
              if (this.currentTime - JSON.parse(localStorage.getItem('leader') || '{"id": "", "time": 0}').time > this.LEADER_TIMEOUT) {
                console.log('get leader');
                localStorage.setItem('leader', JSON.stringify({id: this.tabId, time: Date.now()}));
                this.setLeader(true);
                this.refresh();
                const hbInterval = setInterval(() => {
                  // if (!this.isLeader) {
                  //   console.log('heartbeat stopped');
                  //   clearInterval(hbInterval);
                  // }
                  console.log('heartbeat');
                  const now = Date.now();
                  const leaderData = JSON.parse(localStorage.getItem('leader') || '{}') ;
                  if (leaderData && leaderData.id === this.tabId) {
                    const updatedLeader = {
                      id: this.tabId,
                      time: now
                    }
                    localStorage.setItem('leader', JSON.stringify(updatedLeader));
                  }
                }, this.LEADER_TIMEOUT - 1000);
              } else {
                console.log('not won leader, so request auth');
                authChannel.postMessage({type: 'request_auth'});
                await waitForCondition(() => this.isInit);
              }
            }, Math.random() * 1000 + 100);
          } else {
            console.log('leader already set, so request auth');
            authChannel.postMessage({type: 'request_auth'});
            await waitForCondition(() => this.isInit);
          }
        },
        () => {
          console.log('did not hear pong, so get leader');
          console.log('get leader');
          localStorage.setItem('leader', JSON.stringify({id: this.tabId, time: Date.now()}));
          this.setLeader(true);
          this.refresh();
          const hbInterval = setInterval(() => {
            // if (!this.isLeader) {
            //   console.log('heartbeat stopped');
            //   clearInterval(hbInterval);
            // }
            console.log('heartbeat');
            const now = Date.now();
            const leaderData = JSON.parse(localStorage.getItem('leader') || '{}') ;
            if (leaderData && leaderData.id === this.tabId) {
              const updatedLeader = {
                id: this.tabId,
                time: now
              }
              localStorage.setItem('leader', JSON.stringify(updatedLeader));
            }
          }, this.LEADER_TIMEOUT - 1000);
        },
        500
      );
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    } finally {
      this.setLoading(false);
      this.setInit(true);
    }
  }
}
