import {
  Controller,
  Get,
  Req,
  Body,
  Param,
  HttpStatus,
  Post
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


  // Tesco:string , amt:string  
  // if(amt!){ return "trans failed"}
  // else 
  // 

  @Post('createGiftCard')
  async createUsersdsds(@Body() data: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'User added successfully',
      data: await this.cardsService.createGiftCard(data),
    };
  }

  @Get(':newcard')
  async createUser(@Body() CardNumber: any) {
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
