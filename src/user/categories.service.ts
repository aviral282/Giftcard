import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from '@user/entities/categories.entity';
import { CategoriesDTO } from '@user/dto/categories.dto';
import { toCategoriesDto } from '@util/mapper';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoriesRepository: Repository<CategoriesEntity>
  ) { }

  findAll(): Promise<CategoriesEntity[]> {
    return this.categoriesRepository.find();
  }


  async getAllCategories(): Promise<any[]> {
    const categories = await this.categoriesRepository.find();
    console.log('getAllUsers', categories);
    return categories.map(categories => toCategoriesDto(categories));
  }



  // async findByPayload({ email }: any): Promise<CategoriesDTO> {
  //   const user = await this.userRepository.findOne({ where: { email } });
  //   return toCategoriesDto(user);
  // }

  async read(CategoryId: number) {
    const categories = await this.categoriesRepository.findOne({ where: { CategoryId: CategoryId } })
    return toCategoriesDto(categories);
  }






}
