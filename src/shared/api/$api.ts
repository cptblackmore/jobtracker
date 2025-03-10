import { AuthResponse } from '@shared/model';
import axios from 'axios';import { errorMessages } from '../lib/errorMessages';
;

export const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

$api.interceptors.request.use(config => {
  if (config.url !== '/refresh') {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

$api.interceptors.response.use(config => {
  return config;
}, async (error) => {
  const originalRequest = error.config;

  if (!error.response) {
    throw new Error(errorMessages['ERR_NETWORK']);
  }

  const { code, message } = error.response.data;
  const status = error.response.status;


  if (code === 'UNAUTHORIZED') {
    if (originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>('http://localhost:7000/api/refresh', { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        $api.request(originalRequest);
      } catch {
        throw new Error(errorMessages[code]);
      }
    }
  }

  throw new Error(errorMessages[code] || `Непредвиденная ошибка: ${status}. ${message}`);
})

export default $api;
