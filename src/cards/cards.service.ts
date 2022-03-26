import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsEntity } from './entities/cards.entity';
import { toCardsDto } from '@util/mapper';
import { CreateCardsDTO } from './dto/cards.create.dto';
import { CardProgramEntity } from 'src/cardPrograms/entities/cardprogram.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsEntity)
    private cards: Repository<CardsEntity>,
    @InjectRepository(CardProgramEntity)
    private cardProgram: Repository<CardProgramEntity>,
  ) { }

  findAll(): Promise<CardsEntity[]> {
    return this.cards.find();
  }

  async read(CardNumber: any) {
    const card = await this.cards.findOne({ where: { CardNumber: CardNumber } })
    return toCardsDto(card);
  }

  // Tesco:string , amt:string  
  // if(amt!){ return "trans failed"}
  // else 
  // 

  async createGiftCard(createGiftCardDto: any): Promise<any> {
    console.log('createGiftCardDto', createGiftCardDto);
    const { CardCreationBalance, CardCustomerName, CardRecepientAddress, MerchantName } = createGiftCardDto;
    // if (MerchantName) {
    // } else { return "Merchant Not Found!!" }
    let MatchString = MerchantName + "_" + CardCreationBalance;
    let CardProgramId;  // dusre table se
    const cardPrograms = await this.cardProgram.find();
    cardPrograms.forEach(i => {
      if (i.CardProgramName.toLowerCase() != MatchString.toLowerCase()) {
        return "Transaction failed!";
      } else { CardProgramId = i.CardProgramId; }
    });
    let CardNumber = this.getCardNumber();
    let CardPin = this.getCardPin();
    let CardCurrentBalance = CardCreationBalance;
    const user: CardsEntity = this.cards.create({
      CardNumber, CardCreationBalance, CardCustomerName, CardCurrentBalance, CardPin, CardRecepientAddress, CardProgramId
    });
    await this.cards.save(user);
    return toCardsDto(user);
  }


  async hashPassword(password: string) {
    // return await bcrypt.hash(password, 10);
  }
  getCardNumber() {
    let min = 1000000000000000;
    let max = 9999999999999999;
    let num = Math.floor(Math.random() * min) + max;
    return num.toString();
  }

  getCardPin() {
    let min = 1000;
    let max = 9999;
    let num = Math.floor(Math.random() * min) + max;
    return num;
  }


}
