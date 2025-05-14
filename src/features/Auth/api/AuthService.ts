import { AuthResponse } from "@shared/api";
import $api from "../../../shared/api/$api";
import { AxiosResponse } from "axios";
import { UserData } from "../model/types/UserData";

export class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }

  static async resend(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get("/resend");
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>("/refresh");
  }

  static async acknowledgeRefresh(): Promise<AxiosResponse> {
    return $api.post("/refresh/ack");
  }

  static async getUser(): Promise<AxiosResponse<UserData>> {
    return $api.get<UserData>("/user");
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
