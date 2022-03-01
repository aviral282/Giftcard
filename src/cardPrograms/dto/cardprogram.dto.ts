//import { ScoreDTO } from './score.dto';
import { IsEmail, IsInt, IsNotEmpty, isString, IsString, MaxLength } from 'class-validator';

export class CardProgramDTO {
  CardProgramId: number;

  CardProgramMerchantId: number;

  CardPrice: number;

  CardDiscount: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  CardProgramName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  CardProgramDisplayName: string;


}
