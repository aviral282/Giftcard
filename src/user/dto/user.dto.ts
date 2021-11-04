//import { ScoreDTO } from './score.dto';
import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserDTO {
// export interface UserDTO {
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  value: string;

}
