import { Module } from '@nestjs/common';
import { CardProgramService } from './cardprogram.service';
import { CardProgramController } from './cardprogram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { CardProgramEntity } from '@cardPrograms/entities/cardprogram.entity';
import { CardProgramEntity } from './entities/cardprogram.entity';
import { CategoriesEntity } from '@user/entities/categories.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([CardProgramEntity]),
    TypeOrmModule.forFeature([CategoriesEntity])
  ],
  exports: [TypeOrmModule, CardProgramService],
  providers: [CardProgramService],
  controllers: [CardProgramController]
})
export class CardProgramModule {}
