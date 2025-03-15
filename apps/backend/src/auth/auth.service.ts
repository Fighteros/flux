import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';

type AuthInput = {
  email: string;
  password: string;
};

type SignInResponse = {
  userId: number;
  email: string;
  role: string;
};

type AuthResponse = {
  accessToken: string;
  userId: number;
  email: string;
  role: string;
};


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResponse> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInResponse | null> {
    const user = await this.usersService.findOne(input.email);
    const isCorrectPass = user && await this.tokenService.comparePassword(
      input.password,
      user.password,
    );

    if (user && isCorrectPass) {
      return {
        userId: user.id,
        email: user.email,
        role: user.role,
      };
    }

    return null;
  }

  async signIn(user: SignInResponse): Promise<AuthResponse> {
    const tokenPayload = {
      sub: user.userId,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    // user role from db not and not saved to token for token hijack prevention
    return { accessToken: accessToken, email: user.email, userId: user.userId, role: user.role };
  }
}
