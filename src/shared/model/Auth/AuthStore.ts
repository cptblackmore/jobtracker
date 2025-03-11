import { makeAutoObservable, toJS } from 'mobx';
import { UserData, AlertsStore, createAlert } from '@shared/model';
import { AuthService } from '@shared/api';
import { authChannel, setupAuthChannelListener } from './AuthChannel';
import { broadcastRequestWithFallback, waitForCondition } from '@shared/lib';
import { nanoid } from 'nanoid';
import { startHeartbeatCheck } from './tabSynchronization/startHeartbeatCheck';
import { electLeader } from './tabSynchronization/electLeader';
import { isTabLeader } from './tabSynchronization/isThisTabLeader';

export class AuthStore {
  isInit = false;
  user = {} as UserData;
  isLoading = false;
  isModalOpen = false;
  currentTime: number = Date.now();
  isLeader = false;
  tabId = nanoid();
  LEADER_TIMEOUT = 3000;
  private alertsStore: AlertsStore;

  constructor(alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    makeAutoObservable(this);
    setupAuthChannelListener(this);
    window.addEventListener('beforeunload', () => {
      if (isTabLeader(this.tabId)) {
        localStorage.removeItem('leader');
        sessionStorage.removeItem('refreshing');
        authChannel.postMessage({type: 'leader_left'});
        this.setLeader(false);
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
        {type: 'login', payload: toJS(this.user)}
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
        {type: 'login', payload: toJS(this.user)}
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
      try {
        sessionStorage.setItem('refreshing', 'true');
        const response = await AuthService.refresh();
        localStorage.setItem('token', response.data.accessToken);
        this.setUser(response.data.userDto);
        this.setInit(true);
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
    try {
      if (!localStorage.getItem('token')) {
        this.setInit(true);
        return;
      };
      
      await broadcastRequestWithFallback(
        authChannel,
        'check_leader',
        'leader_here',
        async () => {
          authChannel.postMessage({type: 'request_auth'});
          await waitForCondition(() => this.isInit);
          startHeartbeatCheck(this, authChannel);
        },
        () => electLeader(
          this, 
          authChannel,
          () => this.refresh()
        ),
        500
      );
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    } finally {
      this.setLoading(false);
    }
  }
}
