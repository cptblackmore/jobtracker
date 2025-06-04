import { AuthResponse } from "@shared/api";
import $api from "../../../shared/api/$api";
import { AxiosResponse } from "axios";
import { UserData } from "../model/types/UserData";

export class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/token", { email, password });
  }

  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/users", { email, password });
  }

  static async resend(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/activation/resend");
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/token/refresh");
  }

  static async acknowledgeRefresh(): Promise<AxiosResponse> {
    return $api.patch("/auth/token/acknowledge");
  }

  static async getUser(): Promise<AxiosResponse<UserData>> {
    return $api.get<UserData>("/users/me");
  }

  static async logout(): Promise<void> {
    return $api.delete("/auth/token");
  }
}
