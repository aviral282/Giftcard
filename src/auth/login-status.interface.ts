import { CategoriesDTO } from '@user/dto/categories.dto';

export interface LoginStatus {
  uId: number;
  email: string;
  accessToken: any;
  expiresIn: any;
}
