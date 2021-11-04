import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from '@user/user.module';
import { UserEntity } from '@user/entities/user.entity';
// import { ScoreEntity } from './user/scores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
