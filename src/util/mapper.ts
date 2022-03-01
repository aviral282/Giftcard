
import { CategoriesEntity } from '@user/entities/categories.entity';
import { CategoriesDTO } from '@user/dto/categories.dto';
import { CardProgramEntity } from 'src/cardPrograms/entities/cardprogram.entity';
import { CardProgramDTO } from 'src/cardPrograms/dto/cardprogram.dto';



export const toCategoriesDto = (data: CategoriesEntity): CategoriesDTO => {
  const { CategoryId, CategoryName } = data;
  let userDto: CategoriesDTO = {
    CategoryId, CategoryName
  };

  return userDto;
};


export const toCardProgramDto = (data: CardProgramEntity): CardProgramDTO => {
  const { CardProgramId, CardProgramName, CardProgramDisplayName, CardProgramMerchantId, CardDiscount, CardPrice } = data;
  let cardProgramDto: CardProgramDTO = {
    CardProgramId, CardProgramName, CardProgramDisplayName, CardProgramMerchantId, CardDiscount, CardPrice
  };

  return cardProgramDto;
};
