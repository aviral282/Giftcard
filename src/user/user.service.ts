import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@user/entities/user.entity';
import { UserDTO } from '@user/dto/user.dto';
import { toUserDto } from '@util/mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }


  async getAllUsers(): Promise<any[]> {
    const users = await this.userRepository.find();
    console.log('getAllUsers', users);
    return users.map(user => toUserDto(user));
  }



  async findByPayload({ email }: any): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { email } });
    return toUserDto(user);
  }

  async read(CategoryId: number) {
    const user = await this.userRepository.findOne({ where: { CategoryId: CategoryId } })
    return toUserDto(user);
  }






}
