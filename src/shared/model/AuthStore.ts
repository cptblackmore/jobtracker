import { makeAutoObservable } from 'mobx';
import { UserData, AuthResponse } from '@shared/model';
import { AuthService } from '@shared/api';
import axios from 'axios';

export class AuthStore {
  user = {} as UserData;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: UserData) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userDto);

      window.dispatchEvent(new Event('userLoggedIn'));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
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
      this.setAuth(true);
      this.setUser(response.data.userDto);

      window.dispatchEvent(new Event('userLoggedIn'));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
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

      window.dispatchEvent(new Event('userLoggedOut'));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>('http://localhost:7000/api/refresh', { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userDto);

      window.dispatchEvent(new Event('userLoggedIn'));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      this.setLoading(false);
    }
  }
}
