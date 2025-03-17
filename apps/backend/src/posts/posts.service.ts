import { Injectable } from '@nestjs/common';
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
    filter?: { field: string; value: any };
    search?: { field: string; query: string };
    sort?: { field: string; order: 'ASC' | 'DESC' };
  }) {
    return await this.apiFeatures.findWithAllFeatures(params);
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
