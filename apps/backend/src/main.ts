import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Flux API')
  .setDescription('Flux API description')
  .setVersion('1.0')
  .addTag('flux')
  .build();

  const documentFactory = ()=> SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory());

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  app.enableCors();
  const port = configService.get<number>('app.port') || 5000;
  await app.listen(port);
}

bootstrap().catch((err) => console.log(err));
