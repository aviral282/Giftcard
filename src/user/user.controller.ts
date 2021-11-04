import {
  Controller,
  Get,
  Req,
  Param,
  HttpStatus
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UserListDTO } from '@user/dto/user.list.dto';

@Controller('api/user')
export class UserController {
 
  constructor(private userService: UserService) { }


  @Get()
  async showAllUsers(@Req() req: any): Promise<UserListDTO> {
    const users = await this.userService.getAllUsers();
    return { users };
  }


  @Get(':id')
  async readUser(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.userService.read(id),
    };
  }






}
