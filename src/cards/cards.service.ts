import { Injectable } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsEntity } from './entities/cards.entity';
import { toCardsDto } from '@util/mapper';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsEntity)
    private cards: Repository<CardsEntity>
  ) { }

  findAll(): Promise<CardsEntity[]> {
    return this.cards.find();
  }

  async read(CardNumber: any) {
    const card = await this.cards.findOne({ where: { CardNumber: CardNumber } })
    return toCardsDto(card);
  }






}
