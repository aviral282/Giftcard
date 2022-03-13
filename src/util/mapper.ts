
import { CategoriesEntity } from '@user/entities/categories.entity';
import { CategoriesDTO } from '@user/dto/categories.dto';
import { CardProgramEntity } from 'src/cardPrograms/entities/cardprogram.entity';
import { CardProgramDTO } from 'src/cardPrograms/dto/cardprogram.dto';



export const toCategoriesDto = (data: CategoriesEntity): CategoriesDTO => {
  const { CategoryId, CategoryName } = data;
  let categoriesrDto: CategoriesDTO = {
    CategoryId, CategoryName
  };

  return categoriesrDto;
};


export const toCardProgramDto = (data: CardProgramEntity): CardProgramDTO => {
  const { CardProgramId, ProgramCategoryId, CardProgramName, CardProgramDisplayName, CardProgramMerchantId, CardDiscount, CardPrice } = data;
  let cardProgramDto: CardProgramDTO = {
    CardProgramId, ProgramCategoryId, CardProgramName, CardProgramDisplayName, CardProgramMerchantId, CardDiscount, CardPrice
  };

  return cardProgramDto;
};
