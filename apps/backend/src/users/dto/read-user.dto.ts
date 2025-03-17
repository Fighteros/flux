import { Exclude } from 'class-transformer';
import { Post } from '../../posts/entities/post.entity';
import { Blog } from '../../blogs/entities/blog.entity';

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
