import { UserData } from '../../features/Auth/model/types/UserData';

export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
  userDto: UserData
}
