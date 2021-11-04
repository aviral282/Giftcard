import { UserDTO } from '@user/dto/user.dto';

export interface LoginStatus {
  uId: number;
  email: string;
  accessToken: any;
  expiresIn: any;
}
