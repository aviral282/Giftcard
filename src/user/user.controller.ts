import {
  Controller,
  Get,
  Req,
  Param,
  HttpStatus
} from '@nestjs/common';
import { UserService } from '@user/user.service';

@Controller('api/user')
export class UserController {
 
  constructor(private userService: UserService) { }


  @Get()
  async showAllUsers(@Req() req: any): Promise<any> {
    const users = await this.userService.getAllUsers();
    return { users };
  }


  @Get(':id')
  async readUser(@Param('id') CategoryId: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.userService.read(CategoryId),
    };
  }






}
