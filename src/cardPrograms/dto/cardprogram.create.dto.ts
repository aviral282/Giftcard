import { IsEmail, IsInt, IsNotEmpty, isString, IsString, MaxLength } from 'class-validator';

export class CreateCardProgramDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  CardProgramName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  CardProgramDisplayName: string;

  CardProgramMerchantId: number;

  CardPrice: number;

  CardDiscount: number;


}
