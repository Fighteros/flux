import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from '../token/token.service';

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
  ],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {
  constructor(private configService: ConfigService) {}
}
