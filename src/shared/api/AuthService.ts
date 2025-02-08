import { AuthResponse } from '@shared/model';
import $api from './$api'
import { AxiosResponse } from 'axios';

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { email, password });
  }

  static async resend(): Promise<AxiosResponse> {
    return $api.get('/resend');
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/refresh');
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }
}
