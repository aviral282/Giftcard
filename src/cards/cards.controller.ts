import {
  Controller,
  Get,
  Req,
  Param,
  HttpStatus
} from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('api/cards')
export class CardsController {

  constructor(private cardsService: CardsService) {
    console.log('hitting back');
  }

  @Get()
  async showAllCards(@Req() req: any): Promise<any> {
    const cardPrograms = await this.cardsService.findAll();
    return { cardPrograms };
  }

  @Get(':newcard')
  async createUser(@Body('res') CardNumber: any) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.cardsService.read(CardNumber),
    };
  }



  @Get(':id')
  async readUser(@Param('id') CardNumber: any) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.cardsService.read(CardNumber),
    };
  }

}
