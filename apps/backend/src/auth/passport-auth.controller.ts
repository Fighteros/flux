import {
  Request,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  NotImplementedException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @Get('me')
  getUserInfo() {
    throw new NotImplementedException();
  }
}
