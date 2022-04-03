import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsEntity } from './entities/cards.entity';
import { toCardsDto } from '@util/mapper';
import { CreateCardsDTO } from './dto/cards.create.dto';
import { CardProgramEntity } from 'src/cardPrograms/entities/cardprogram.entity';
import * as mailer from 'nodemailer'
import * as wordToNum from 'words-to-numbers'
import * as emailValidator from 'email-validator'

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

  async HighestSellingMerchant()
  {
    const cardPrograms = await this.cardProgram.find();
    const cards = await this.cards.find();
    
    let cardToCardProgram = new Map();

    cards.forEach(i => {
      if(!cardToCardProgram.has(i.CardProgramId))
      {
        cardToCardProgram.set(i.CardProgramId,1);
      }
      else
      {
        let currentVal = cardToCardProgram.get(i.CardProgramId);
        currentVal++;
        cardToCardProgram.delete(i.CardProgramId);
        cardToCardProgram.set(i.CardProgramId,currentVal);
      }
    }) 

    let maxValue = 0;
    let CardProgramId = 0;

    cardToCardProgram.forEach(function(value, key) {
      if(value > maxValue)
      {
        maxValue = value;
        CardProgramId = key;
      }
    })
    
    let highestSellingProgramName = '';
    cardPrograms.forEach(i => {
      if (i.CardProgramId == CardProgramId) {
        highestSellingProgramName = i.CardProgramName;
      } 
    });

    let splitString = highestSellingProgramName.split("_");
    highestSellingProgramName = splitString[0].toString();
    return highestSellingProgramName;

  }

  async createGiftCard(createGiftCardDto: any): Promise<any> {
   
   try{
    console.log('createGiftCardDto', createGiftCardDto);
    let { CardCreationBalance, CardCustomerName, CardRecepientAddress, MerchantName, GreetingMessage, PurchaserEmailAddress, PurchaserName } = createGiftCardDto;

    let MatchString = MerchantName + "_" + CardCreationBalance;
    let CardProgramId = 0;  // dusre table se
    const cardPrograms = await this.cardProgram.find();
    cardPrograms.forEach(i => {
      if (i.CardProgramName.toLowerCase() === MatchString.toLowerCase()) {
        CardProgramId = i.CardProgramId;
      }
    });

   let finalEmail = await this.formatEmail(CardRecepientAddress);
    console.log(finalEmail);
    CardRecepientAddress = finalEmail;

    if(CardProgramId === 0 && emailValidator.validate(CardRecepientAddress))
    {
      console.log("here**************");
      throw new Error("Invalid Program");
    }
    let CardNumber = this.getCardNumber();
    let CardPin = this.getCardPin();
    let CardCurrentBalance = CardCreationBalance;
    const user: CardsEntity = this.cards.create({
      CardNumber, CardCreationBalance, CardCustomerName, CardCurrentBalance, CardPin, CardRecepientAddress, CardProgramId
    });
    
    //let res = await this.sendMail(CardNumber, CardPin, CardRecepientAddress, MerchantName, CardCreationBalance, GreetingMessage,CardCustomerName);
    let res = await this.emailSend(CardNumber, CardPin, CardRecepientAddress, MerchantName, CardCreationBalance, GreetingMessage,CardCustomerName);
    let sendRes = await this.sendBillingEmail(PurchaserEmailAddress, MerchantName, CardCreationBalance,CardCustomerName,PurchaserName);
    
    console.log('************************** RES: '+res);
     if(res != 0 && sendRes != 0)
     {
     await this.cards.save(user);
     return toCardsDto(user);
     }
    else
     {
       throw new Error("Invalid Email");
     }
    
    
   }
   catch(error)
   {
     console.log('Error in Create Gift Card: '+error);
     throw error;
   }
   
  }

  formatEmail(passedEmail)
  {
    let splitString = passedEmail.split(" ");
    console.log(splitString);

    for (let i = 0; i < splitString.length; i++) {
      if(splitString[i] === 'dot')
      {
        splitString[i] = '.';
      }
    }

    if(splitString[splitString.length - 4] === 'at')
    {
      splitString[splitString.length - 4] = '@';
    }    
    let str = '';
    splitString.forEach(i =>
      {
        str += wordToNum.wordsToNumbers(i);
      });

      return str;
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

  async emailSend(CardNumber, CardPin, CardRecepientAddress, MerchantName, CardCreationBalance, GreetingMessage,CardCustomerName) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await mailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = mailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'giftcardsendmail@gmail.com',
        pass: 'Qwerty@22'
      }
    });
  
    let emailText = 'Dear ' + CardCustomerName + ',' + '\n' +  GreetingMessage + '\n' +  'Here are your gift card details : ' + '\n' + 'Card Number : ' + CardNumber + '\n' + 'Card Pin : ' + CardPin + '\n' + 'Merchant Name: ' + MerchantName + '\n' +
        'Your Card Balance in Euros : ' + CardCreationBalance;
      let message = {
        to: CardRecepientAddress,
        subject: 'Hurray! You got a new Gift Card! ',
        text: emailText,
      };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(message).then( console.log('Sending Mail')).catch(() => {return 0;});
    return info;
  }

  async sendBillingEmail(PurchaserEmailAddress, MerchantName, CardCreationBalance,CardCustomerName,PurchaserName) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await mailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = mailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'giftcardsendmail@gmail.com',
        pass: 'Qwerty@22'
      }
    });
  
    let emailText = 'Dear ' + PurchaserName + ',' + '\n' +  'Your gift card purchase has been completed successfully and card details are sent to ' + CardCustomerName +' : ' + '\n' + 'Merchant Name: ' + MerchantName + '\n' +
        'Your Card Amount in Euros : ' + CardCreationBalance;
      let message = {
        to: PurchaserEmailAddress,
        subject: 'Gift Card Purchase Successful',
        text: emailText,
      };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(message).then( console.log('Sending Mail')).catch(() => {return 0;});
    return info;
  }





}



