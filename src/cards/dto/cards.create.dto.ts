import { IsEmail, IsInt, IsNotEmpty, isString, IsString, MaxLength } from 'class-validator';

export class CreateCardsDTO {

  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  CardNumber: string;

  @IsString()
  @MaxLength(500)
  CardRecepientAddress: string;

  @IsString()
  @MaxLength(500)
  CardCustomerName: string;

  CardPin: number;

  CardCreationBalance: number;

  CardCurrentBalance: number;

  CardProgramId: number;


}
