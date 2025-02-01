import { UserData } from '../types/UserData';

export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
  userDto: UserData
}
