import { Module } from '@nestjs/common';
import { CardsEntity } from './entities/cards.entity';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './cards.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([CardsEntity])
  ],
  exports: [TypeOrmModule, CardsService],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}
