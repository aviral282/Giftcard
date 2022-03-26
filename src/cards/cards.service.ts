import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsEntity } from './entities/cards.entity';
import { toCardsDto } from '@util/mapper';
import { CreateCardsDTO } from './dto/cards.create.dto';
import { CardProgramEntity } from 'src/cardPrograms/entities/cardprogram.entity';
import * as mailer from 'nodemailer'

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
    this.sendMail(CardNumber, CardPin, CardRecepientAddress, MerchantName, CardCreationBalance)
    return toCardsDto(user);
  }

  getCardNumber() {
    let min = 9000000000000000;
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


  async sendMail(CardNumber, CardPin, CardRecepientAddress, MerchantName, CardCreationBalance) {
    mailer.createTestAccount((err, account) => {
      if (err) {
        console.error('Failed to create a testing account');
        console.error(err);
        return process.exit(1);
      }
      let transporter = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'giftcardsendmail@gmail.com',
          pass: 'Qwerty@22'
        }
      });
      let emailText = 'Card Number : ' + CardNumber + '\n' + 'Card Pin : ' + CardPin + '\n' + 'Merchant Name: ' + MerchantName + '\n' +
        'Your Card Balance : ' + CardCreationBalance;
      let message = {
        to: CardRecepientAddress,
        subject: 'Hurray! You got a new Gift Card! ',
        text: emailText,
      };
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log('Error occurred');
          console.log(error.message);
          return process.exit(1);
        }
        transporter.close();
      });
    });
    console.log('Message sent successfully!');
  }


}
