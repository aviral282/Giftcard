//import { ScoreDTO } from './score.dto';
import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoriesDTO {
  CategoryId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  CategoryName: string;

}
