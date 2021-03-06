import {
  Controller,
  Get,
  Req,
  Param,
  HttpStatus
} from '@nestjs/common';
import { CardProgramService } from './cardprogram.service';

@Controller('api/discountedcards')
export class CardProgramController {

  constructor(private cardProgramService: CardProgramService) {
    console.log('hitting back');
  }

  @Get()
  async showAllDiscountedCards(@Req() req: any): Promise<any> {
    const cardPrograms = await this.cardProgramService.getAllDiscountedCardPrograms();
    return { cardPrograms };
  }


  @Get(':id')
  async readUser(@Param('id') CardDiscount: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.cardProgramService.read(CardDiscount),
    };
  }

  @Get('category/:name')
  async cardByCategory(@Param('name') CardCategory: any) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.cardProgramService.getCardProgramsByCategory(CardCategory),
    };
  }




}
