import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  NotImplementedException
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { email: string; password: string }) {
    throw new NotImplementedException();
  }

  @Get('me')
  getUserInfo() {
    throw new NotImplementedException();
  }
}
