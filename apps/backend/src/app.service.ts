import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    return {
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<string>('database.port'),
      user: this.configService.get<string>('database.user'),
      password: this.configService.get<string>('database.password'),
      name: this.configService.get<string>('database.name'),
    };
  }

  getAppConfig() {
    return {
      port: this.configService.get<number>('app.port'),
      env: this.configService.get<number>('app.node_env'),
    };
  }
}
