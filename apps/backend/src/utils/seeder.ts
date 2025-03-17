import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from '../bcrypt/bcrypt.service';

async function createAdminSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UsersService);
  const configService = app.get(ConfigService);
  const bcryptService = app.get(BcryptService);

  const email = configService.get<string>('admin.email') || '';
  const password = configService.get<string>('admin.password') || '';

  const adminExists = await userService.findOne(email);
  if (!adminExists && email != '' && password != '') {
    await userService.create({
      first_name: 'admin',
      last_name: 'flux',
      email: email,
      password:password,
      avatar: '',
    }, true);
    console.log('✅ Admin user created!');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }

  await app.close();
}

createAdminSeed();
