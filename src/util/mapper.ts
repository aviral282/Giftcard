
import { UserEntity } from '@user/entities/user.entity';
import { UserDTO } from '@user/dto/user.dto';
import { CardProgramEntity } from 'src/cardPrograms/entities/cardprogram.entity';
import { CardProgramDTO } from 'src/cardPrograms/dto/cardprogram.dto';



export const toUserDto = (data: UserEntity): UserDTO => {
  const { CategoryId, CategoryName } = data;
  let userDto: UserDTO = {
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
