import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('app.jwt_secret'),
        signOptions: {
          expiresIn: configService.get<string>('app.jwt_expires_in'),
        },
      }),
    }),
    PassportModule,
  ],
  providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy],
  controllers: [AuthController, PassportAuthController],
})
export class AuthModule {}
