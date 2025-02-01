import { AuthResponse } from '@shared/model';
import axios from 'axios';;

export const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(config => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  const networkError = error.code === 'ERR_NETWORK';
  const { code, message } = error.response.data;
  const status = error.response.status;

  if (networkError) {
    throw new Error('Ошибка сети. Проверьте подключение или попробуйте позже.');
  }

  if (status === 400) {
    switch (code) {
      case 'INVALID_EMAIL':
        throw new Error('Некорректный email.');
      case 'INVALID_PASSWORD':
        throw new Error('Пароль должен быть от 6 до 24 символов.');
      default:
        throw new Error(`Непредвиденная ошибка: ${message}`);
    }
  }

  if (status === 401) {
    switch(code) {
      case 'INVALID_CREDENTIALS':
        throw new Error('Неправильный email или пароль.');
      case 'UNAUTHORIZED':
        if (originalRequest && !originalRequest._isRetry) {
          originalRequest._isRetry = true;
          try {
            const response = await axios.get<AuthResponse>('http://localhost:7000/api/refresh', { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            $api.request(originalRequest);
          } catch {
            throw new Error('Необходимо авторизоваться.');
          }
        }
        break;
      default:
        throw new Error(`Непредвиденная ошибка: ${message}`);
    }
  }

  if (status === 409) {
    switch (code) {
      case 'EMAIL_EXISTS':
        throw new Error('Пользователь с таким email уже существует.');
      default:
        throw new Error(`Непредвиденная ошибка: ${message}`);
    }
  }

  throw new Error(`Непредвиденная ошибка: ${message}`);
})

export default $api;
