import { Module } from '@nestjs/common';
import { CardsEntity } from './entities/cards.entity';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './cards.controller';
import { CardProgramEntity } from 'src/cardPrograms/entities/cardprogram.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([CardsEntity]),
    TypeOrmModule.forFeature([CardProgramEntity]),

  ],
  exports: [TypeOrmModule, CardsService],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}
