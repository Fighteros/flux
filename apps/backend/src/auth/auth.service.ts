import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}



  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.userService.findOne(email);
  //   if (user && bcrypt.compareSync(password, user.password)) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async login(user: any) {
  //   const payload = { email: user.email, sub: user.id, role: user.role };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
