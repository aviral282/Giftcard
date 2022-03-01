import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from '@user/entities/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesEntity])
  ],
  exports: [TypeOrmModule, CategoriesService],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
