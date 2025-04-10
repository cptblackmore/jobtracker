import { UserData } from '../UserData';

export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
  userDto: UserData
}
