import { makeAutoObservable } from 'mobx';
import { UserData, AuthResponse, AlertsStore, createAlert } from '@shared/model';
import { AuthService } from '@shared/api';
import axios from 'axios';

export class AuthStore {
  user = {} as UserData;
  isAuth: boolean | null = null;
  isActivated = false;
  isLoading = false;
  isModalOpen = false;
  private alertsStore: AlertsStore;

  constructor(alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    makeAutoObservable(this);
  }

  setAuth(bool: boolean | null) {
    this.isAuth = bool;
  }

  setUser(user: UserData) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setActivated(bool: boolean) {
    this.isActivated = bool;
  }

  setModalOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  async login(email: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setActivated(response.data.userDto.isActivated);
      this.setAuth(true);
      this.setUser(response.data.userDto);
      this.setModalOpen(false);
      if (!this.isActivated) {
      this.alertsStore.addAlert(createAlert('Ваш аккаунт не активирован, проверьте вашу почту! Если письмо не пришло или ссылка не работает, повторите запрос в личном кабинете.', 'warning', 10000));
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
      this.setActivated(false);
      this.setAuth(true);
      this.setUser(response.data.userDto);
      this.alertsStore.addAlert(createAlert(`Регистрация прошла успешно. На вашу почту ${response.data.userDto.email} отправлено письмо для подтверждения.`, 'warning'));
      this.setModalOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as UserData);
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      if (!localStorage.getItem('token')) {
        this.setAuth(false);
        return;
      };

      const response = await AuthService.refresh();
      localStorage.setItem('token', response.data.accessToken);
      this.setActivated(response.data.userDto.isActivated);
      this.setAuth(true);
      this.setUser(response.data.userDto);
      if (!this.isActivated) {
        this.alertsStore.addAlert(createAlert('Ваш аккаунт не активирован, проверьте вашу почту! Если письмо не пришло или ссылка не работает, повторите запрос в личном кабинете.', 'warning', 10000));
      }
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    } finally {
      this.setLoading(false);
    }
  }
}
