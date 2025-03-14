import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenService } from '../token/token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ReadUserDto } from './dto/read-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const { password } = createUserDto;

    // Hash the password
    const hashedPassword = await this.tokenService.hashPassword(password);

    const user = {
      ...createUserDto,
      password: hashedPassword,
    };

    const newUser = this.userRepository.create(user);

    const savedUser = await this.userRepository.save(newUser);

    return plainToInstance(ReadUserDto, savedUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string) {
    const user = this.userRepository.findOneBy({ email: email });

    return plainToInstance(ReadUserDto, user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
