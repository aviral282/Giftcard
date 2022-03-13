import {
  Controller,
  Get,
  Req,
  Param,
  HttpStatus
} from '@nestjs/common';
import { CategoriesService } from '@user/categories.service';

@Controller('api/categories')
export class CategoriesController {
 
  constructor(private categoriesService: CategoriesService) { }


  @Get()
  async showAllCategories(@Req() req: any): Promise<any> {
    const users = await this.categoriesService.getAllCategories();
    return { users };
  }


  @Get(':id')
  async readUser(@Param('id') CategoryId: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.categoriesService.read(CategoryId),
    };
  }
}
