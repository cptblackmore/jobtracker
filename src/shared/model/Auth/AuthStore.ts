import { makeAutoObservable } from 'mobx';
import { UserData, AlertsStore, createAlert } from '@shared/model';
import { AuthService } from '@shared/api';
import { authChannel, setupAuthChannelListener } from './AuthChannel';
import { broadcastRequestWithFallback, waitForCondition } from '@shared/lib';

export class AuthStore {
  isInit = false;
  user = {} as UserData;
  isAuth: boolean | null = null; // TODO return boolean only after isInit implementation
  isActivated = false; // TODO delete after replacing by user.isActivated
  isLoading = false;
  isModalOpen = false;
  currentTime: number = Date.now();
  private alertsStore: AlertsStore;

  constructor(alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    makeAutoObservable(this);
    setupAuthChannelListener(this);
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

  setAuth(bool: boolean | null) { // TODO return boolean only after isInit implementation
    this.isAuth = bool;
  }

  setUser(user: UserData) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setActivated(bool: boolean) { // TODO delete after replacing by user.isActivated
    this.isActivated = bool;
  }

  setModalOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  updateCurrentTime() {
    this.currentTime = Date.now();
  }

  async login(email: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setActivated(response.data.userDto.isActivated);
      this.setUser(response.data.userDto);
      this.setAuth(true);
      this.setModalOpen(false);
      authChannel.postMessage(
        {type: 'login', payload: {isAuth: this.isAuth, user: {...this.user}, isActivated: this.isActivated}} // TODO delete this.isActivated after replacing by user.isActivated
      );
      if (!this.isActivated) {
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
      this.setActivated(false); // TODO delete after replacing by user.isActivated
      this.setUser(response.data.userDto);
      this.setAuth(true);
      this.setModalOpen(false);
      authChannel.postMessage(
        {type: 'login', payload: {isAuth: this.isAuth, user: {...this.user}, isActivated: this.isActivated}} // TODO delete this.isActivated after replacing by user.isActivated
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
      this.setActivated(false); // TODO delete after replacing by user.isActivated
      this.setUser({} as UserData);
      this.setAuth(false);
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
        this.setActivated(response.data.userDto.isActivated); // TODO delete after replacing by user.isActivated
        this.setUser(response.data.userDto);
        this.setAuth(true);
        if (!this.isActivated) { // TODO replace by !this.user.isActivated
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
        this.setAuth(false); // TODO delete after isInit implementation
        return;
      };
      
      await broadcastRequestWithFallback(
        authChannel,
        'ping',
        'pong',
        async () => {
          authChannel.postMessage({type: 'request_auth'});
          await waitForCondition(() => this.isAuth !== null); // TODO reaplce isAuth by isInit after isInit implementation
        },
        () => this.refresh(),
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
