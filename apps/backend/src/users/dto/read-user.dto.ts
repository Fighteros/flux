import { Exclude } from 'class-transformer';

export class ReadUserDto {
  id: number;

  first_name: string;

  last_name: string;

  email: string;

  avatar: string;

  role: string;

  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  password: string;
}
