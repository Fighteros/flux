import {
  Body,
  Controller,
  Request,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { ReadUserDto } from './dto/read-user.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-admin')
  @UseGuards(PassportJwtAuthGuard)
  createAdmin(@Request() request) {
    return request.user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    if (!users)
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    return plainToInstance(ReadUserDto, users);
  }

  @Get(':email')
  async findOne(@Param('email', new ValidationPipe()) email: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(ReadUserDto, user);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
