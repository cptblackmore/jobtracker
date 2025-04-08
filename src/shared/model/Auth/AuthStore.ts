import { makeAutoObservable, reaction, toJS } from 'mobx';
import { UserData, AlertsStore, createAlert, Alert } from '@shared/model';
import { AuthService } from '@shared/api';
import { authChannel, setupAuthChannelListener } from './AuthChannel';
import { blurActiveElement, broadcastRequestWithFallback, waitForCondition } from '@shared/lib';
import { nanoid } from 'nanoid';
import { startHeartbeatCheck } from './tabSynchronization/startHeartbeatCheck';
import { electLeader } from './tabSynchronization/electLeader';
import { isTabLeader } from './tabSynchronization/isThisTabLeader';

export class AuthStore {
  isInit = false;
  user = {} as UserData;
  isLoading = false;
  isModalOpen = false;
  isModalLoginForm = true;
  currentTime: number = Date.now();
  isLeader = false;
  tabId = nanoid();
  LEADER_TIMEOUT = 3000;
  authChannel = authChannel;
  private alertsStore: AlertsStore;

  constructor(alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    makeAutoObservable(this);
    setupAuthChannelListener(this, alertsStore);
    window.addEventListener('beforeunload', () => {
      if (isTabLeader(this.tabId)) {
        localStorage.removeItem('leader');
        sessionStorage.removeItem('refreshing');
        authChannel.postMessage({type: 'leader_left'});
        this.setLeader(false);
      }
    });
    
    reaction(
      () => this.user?.isActivated, 
      (isActivated) => {
        if (isActivated) {
          this.alertsStore.removeAlertsByTag('activation-required');
        }
      },
      {equals: (prev, next) => prev === next}
    )
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

  setModalOpen(bool: boolean, formOnOpen?: 'login' | 'registration') {
    if (formOnOpen) {
      if (formOnOpen === 'login') {
        this.setModalLoginForm(true);
      } else {
        this.setModalLoginForm(false);
      }
    }
    this.isModalOpen = bool;
  }

  closeModalOnSuccess() {
    blurActiveElement();
    this.isModalOpen = false;
  }

  setModalLoginForm(bool: boolean) {
    this.isModalLoginForm = bool;
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
      this.closeModalOnSuccess();
      authChannel.postMessage(
        {type: 'login', payload: toJS(this.user)}
      );
      if (!this.user.isActivated) {
      this.alertsStore.addAlert(
        createAlert(
          'Ваш аккаунт не активирован, проверьте вашу почту! Если письмо не пришло или ссылка не работает, повторите запрос в личном кабинете.', 
          'warning',
          10000,
          'activation-required'
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
      this.closeModalOnSuccess();
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

  async logout(reason?: string, severity?: Alert['severity']) {
    try {
      localStorage.removeItem('token');
      this.setUser({} as UserData);
      this.setInit(true);
      authChannel.postMessage({type: 'logout', payload: {reason, severity}});
      if (reason) this.alertsStore.addAlert(createAlert(reason, severity || 'error'));
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

  async getUser() {
    try {
      const response = await AuthService.getUser();
      this.setUser(response.data);
      this.setInit(true);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
    }
  }

  async refresh() {
    if (!sessionStorage.getItem('refreshing')) {
      try {
        sessionStorage.setItem('refreshing', 'true');
        const response = await AuthService.refresh();
        localStorage.setItem('token', response.data.accessToken);
        await AuthService.acknowledgeRefresh();
        this.setUser(response.data.userDto);
        this.setInit(true);
        if (!this.user.isActivated) {
          this.alertsStore.addAlert(
            createAlert(
              'Ваш аккаунт не активирован, проверьте вашу почту! Если письмо не пришло или ссылка не работает, повторите запрос в личном кабинете.',
              'warning',
              10000,
              'activation-required'
            )
          );
        }
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        }
      } finally {
        sessionStorage.removeItem('refreshing');
      }
    } else {
      await waitForCondition(() => !sessionStorage.getItem('refreshing'));
      this.refresh();
    }
  }

  async updateUser() {
    if (this.isAuth && this.isLeader) {
      try {
        await this.getUser();
        authChannel.postMessage({type: 'response_auth', payload: toJS(this.user)});
      } catch (e) {
        if (e instanceof Error) {
          this.logout(e.message, 'error');
        }
      }
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
          startHeartbeatCheck(this, authChannel);
          await waitForCondition(() => this.isInit);
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
        await this.logout(e.message, 'error');
      }
    } finally {
      this.setLoading(false);
    }
  }
}
