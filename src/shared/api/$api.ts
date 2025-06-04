import { AuthResponse } from "@shared/api";
import axios from "axios";
import { errorMessages } from "../lib/error/errorMessages";
import { PassthroughError } from "./PassthroughError";

export const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

$api.interceptors.request.use((config) => {
  if (!config.url?.match("/auth/token/refresh")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      throw new Error(errorMessages["ERR_NETWORK"]);
    }

    const { code, message } = error.response.data;
    const status = error.response.status;

    if (code === "INVALID_CREDENTIALS" || code === "EMAIL_EXISTS") {
      throw new PassthroughError(errorMessages[code], code, status);
    }

    if (code === "UNAUTHORIZED") {
      if (originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
          const response = await axios.post<AuthResponse>(
            `${import.meta.env.VITE_API_URL}/auth/token/refresh`,
            { withCredentials: true },
          );
          localStorage.setItem("token", response.data.accessToken);
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/auth/token/acknowledge`,
            {},
            { withCredentials: true },
          );
          return $api.request(originalRequest);
        } catch {
          throw new Error(errorMessages[code]);
        }
      }
    } else {
      throw new Error(
        errorMessages[code] || `Непредвиденная ошибка: ${status}. ${message}`,
      );
    }
  },
);

export default $api;
