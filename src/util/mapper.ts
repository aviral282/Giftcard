
import { UserEntity } from '@user/entities/user.entity';
import { UserDTO } from '@user/dto/user.dto';


export const toUserDto = (data: UserEntity): UserDTO => {
  const { id, value } = data;
  let userDto: UserDTO = {
    id, value
  };

  return userDto;
};


