import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriesDTO {
  @IsEmail()
  @MaxLength(255)
  CategoryName: string;


}
