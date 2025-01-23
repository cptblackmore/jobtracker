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
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthResponse>('http://localhost:7000/api/refresh', { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      $api.request(originalRequest);
    } catch (e) {
      console.log('User is not authorized:', e);
    }
  }
  throw error;
})

export default $api;
