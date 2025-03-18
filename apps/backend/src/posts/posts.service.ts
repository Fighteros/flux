import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { ApiFeatures } from '../utils/ApiFeatures';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadPostDto } from './dto/read-post';
import { User } from '../users/entities/user.entity';
import slugify from 'slugify';

@Injectable()
export class PostsService {
  private apiFeatures: ApiFeatures<Post>;

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    this.apiFeatures = new ApiFeatures<Post>(this.postRepository, ReadPostDto);
  }

  // only used for seeding posts
  async createPostSeed(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    const savedPost = await this.postRepository.save(post);

    return savedPost;
  }

  async create(createPostDto: CreatePostDto, req) {
    const { user } = req;
    const userId = user.userId;
    const post = this.postRepository.create({
      ...createPostDto,
      slug: slugify(createPostDto.title),
      author: { id: userId } as User,
    });

    const savedPost = await this.postRepository.save(post);
    return savedPost;
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    search?: { field: string; query: any };
    sort?: { field: string; order: 'ASC' | 'DESC' };
  }) {
    return await this.apiFeatures.findWithAllFeatures(params);
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOneBy({ id: id });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, req) {
    const { user } = req;
    const userId = user.userId;

    const post = await this.postRepository.findOne({
      where: { id: id, author: { id: userId } },
    });

    if (!post) {
      throw new ForbiddenException();
    }
    // update
    await this.postRepository.update(id, updatePostDto);

    return updatePostDto;
  }

  async remove(id: number, req) {
    const { user } = req;
    const userId = user.userId;

    const post = await this.postRepository.findOne({
      where: { id: id, author: { id: userId } },
    });

    if (!post) {
      throw new ForbiddenException();
    }

    const post_to_delete = await this.postRepository.delete(id);

    if (post_to_delete.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return;
  }
}
