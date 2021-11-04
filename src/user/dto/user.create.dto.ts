import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @MaxLength(255)
  value: string;


}
