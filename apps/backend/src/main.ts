import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  const port = configService.get<number>('app.port') || 5000;
  await app.listen(port);
}

bootstrap().catch((err) => console.log(err));
