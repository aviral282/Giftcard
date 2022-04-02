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

  @Post('createGiftCard')
  async createUsersdsds(@Body() data: any) {
    try{
      let d = await this.cardsService.createGiftCard(data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Gift Card Transaction Successful and Card details sent over email.',
        data: d,
      };
    }
    catch(error)
    {
      return{
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Transaction Failed, please try again.'
      }
    }
    
  }

  @Get("highestSellingMerchant")
  async findTrendingMerchant()
  {
    let d = await this.cardsService.HighestSellingMerchant();
    return {
      statusCode: HttpStatus.OK,
      data: d
    }
  }

  @Get(':id')
  async readUser(@Param('id') CardNumber: any) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.cardsService.read(CardNumber),
    };
  }

}
