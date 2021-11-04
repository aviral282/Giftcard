import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtPayload } from './payload.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor() { }


  @Get('whoami')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
