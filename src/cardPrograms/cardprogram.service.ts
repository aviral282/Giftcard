import { Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardProgramEntity } from './entities/cardprogram.entity';
import { toCardProgramDto } from '@util/mapper';
import { Query } from '@nestjs-query/core';

@Injectable()
export class CardProgramService {
  constructor(
    @InjectRepository(CardProgramEntity)
    private cardProgram: Repository<CardProgramEntity>
  ) { }

  findAll(): Promise<CardProgramEntity[]> {
    return this.cardProgram.find();
  }


  async getAllCardPrograms(): Promise<any[]> {



    let filter = {};


    filter = {
      CardDiscount: [{ CardDiscount: { gt: 0 } }]
    }



    console.log('filter', filter);
    const cardPrograms = await this.cardProgram.find();
    
    let newCardProg = [];
   
    cardPrograms.forEach(i => {
      if(i.CardDiscount > 0 )
      {
        newCardProg.push(i);
      }
    });
      


    console.log('getAllCardPrograms', newCardProg);
    return newCardProg.map(user => toCardProgramDto(user));
  }

  async read(CardDiscount: number) {
    const user = await this.cardProgram.findOne({ where: { CardDiscount: CardDiscount } })
    return toCardProgramDto(user);
  }






}
