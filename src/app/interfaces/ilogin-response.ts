import { IUser } from './iuser';

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
  refreshToken: string;
}
