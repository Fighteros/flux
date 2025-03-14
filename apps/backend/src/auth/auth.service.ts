import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ReadUserDto } from '../users/dto/read-user.dto';

type AuthInput = {
  email: string;
  password: string;
};

type SignInResponse = {
  userId: number;
  email: string;
};

type AuthResponse = {
  accessToken: string;
  userId: number;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async authenticate(input: AuthInput): Promise<AuthResponse> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      accessToken: 'fake-token',
      userId: user.userId,
      email: user.email,
    };
  }

  async validateUser(input: AuthInput): Promise<SignInResponse | null> {
    const user = await this.usersService.findOne(input.email);

    if (user && user.password === input.password) {
      return {
        userId: user.id,
        email: user.email,
      };
    }

    return null;
  }
}
