import { Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardProgramEntity } from './entities/cardprogram.entity';
import { toCardProgramDto } from '@util/mapper';
import { CategoriesEntity } from '@user/entities/categories.entity';

@Injectable()
export class CardProgramService {
  constructor(
    @InjectRepository(CardProgramEntity)
    private cardProgram: Repository<CardProgramEntity>,
    @InjectRepository(CategoriesEntity)
    private categories: Repository<CategoriesEntity>
  ) { }

  findAll(): Promise<CardProgramEntity[]> {
    return this.cardProgram.find();
  }

  async getCardProgramsByCategory(CardCategory: any): Promise<any[]> {

    const cardPrograms = await this.cardProgram.find();
    const categories = await this.categories.find();
    let currentCategoryId = 0;
    let newCardProg = [];
    categories.forEach(i => {
      if (i.CategoryName == CardCategory) { currentCategoryId = i.CategoryId; }
    })
    cardPrograms.forEach(i => {
      if (i.ProgramCategoryId == currentCategoryId) {
        newCardProg.push(i);
      }
    });
    return newCardProg.map(user => toCardProgramDto(user));
  }


  async getAllDiscountedCardPrograms(): Promise<any[]> {

    const cardPrograms = await this.cardProgram.find();
    let newCardProg = [];

    cardPrograms.forEach(i => {
      if (i.CardDiscount > 0) {
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
