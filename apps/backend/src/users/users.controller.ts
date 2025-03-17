import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { ReadUserDto } from './dto/read-user.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-admin')
  @Roles(Role.ADMIN) // Only admins can access
  @UseGuards(PassportJwtAuthGuard, RolesGuard)
  createAdmin(@Body() createUserDto: CreateUserDto, @Request() request) {
    return this.usersService.create(createUserDto, true);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: 'ASC' | 'DESC',
    @Query('role') role: string,
    @Query('email') email: string,
  ) {
    const users = await this.usersService.findAll({
      page,
      limit,
      filter: email
        ? { field: 'email', value: email }
        : role
          ? { field: 'role', value: role }
          : undefined,
      sort: sort ? { field: 'createdAt', order: sort } : undefined,
    });
    if (!users.data.length)
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    return users;
  }

  @Get(':email')
  async findOne(@Param('email', new ValidationPipe()) email: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(ReadUserDto, user);
  }

  @Patch(':id')
  @UseGuards(PassportJwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() request,
  ) {
    const user = this.usersService.update(+id, updateUserDto, request);
    return plainToInstance(ReadUserDto, user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(PassportJwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() request) {
    return this.usersService.remove(+id, request);
  }
}
