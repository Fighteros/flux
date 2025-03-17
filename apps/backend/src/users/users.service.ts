import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ReadUserDto } from './dto/read-user.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiFeatures } from '../utils/ApiFeatures';

@Injectable()
export class UsersService {
  private apiFeatures: ApiFeatures<User>;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: BcryptService,
  ) {
    this.apiFeatures = new ApiFeatures<User>(this.userRepository, ReadUserDto);
  }

  async create(createUserDto: CreateUserDto, isAdmin = false) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('You can not create a user with this email');
    }
    const { password } = createUserDto;

    // Hash the password
    const hashedPassword = await this.tokenService.hashPassword(password);

    // ensure that user role always lowercase to match role enum
    const user = {
      ...createUserDto,
      password: hashedPassword,
      role: isAdmin ? 'admin' : 'user',
    };

    // Save User to db
    const newUser = this.userRepository.create(user);

    const savedUser = await this.userRepository.save(newUser);

    return plainToInstance(ReadUserDto, savedUser);
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    filter?: { field: string; value: any };
    search?: { field: string; query: string };
    sort?: { field: string; order: 'ASC' | 'DESC' };
  }) {
    return await this.apiFeatures.findWithAllFeatures(params);
  }

  async findOne(email: string) {
    const user = this.userRepository.findOneBy({ email: email });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, request) {
    const { user } = request;
    const userId = user.userId;
    // if not the same user reject
    if (userId != id) {
      throw new ForbiddenException();
    }
    // Update user
    await this.userRepository.update(userId, updateUserDto);
    const updatedUser = this.userRepository.findOneBy({ id: userId });

    return updatedUser;
  }

  async remove(id: number, request) {
    const { user } = request;
    const userId = user.userId;

    if (userId != id) {
      throw new ForbiddenException();
    }

    const user_to_delete = await this.userRepository.delete(userId);

    if (user_to_delete.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
