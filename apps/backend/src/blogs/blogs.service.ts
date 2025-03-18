import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { ApiFeatures } from '../utils/ApiFeatures';
import { Repository } from 'typeorm';
import { ReadBlogDto } from './dto/read-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import slugify from 'slugify';

@Injectable()
export class BlogsService {
  private apiFeatures: ApiFeatures<Blog>;

  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {
    this.apiFeatures = new ApiFeatures<Blog>(this.blogsRepository, ReadBlogDto);
  }


  // only used for seeding posts
  async createBlogSeed(createBlogDto: CreateBlogDto) {

    const postToSave = {
      ...CreateBlogDto,
      author: {   } as User,
    }
    const post = this.blogsRepository.create(createBlogDto);
    const savedPost = await this.blogsRepository.save(post);

    return savedPost;
  }

  async create(createBlogDto: CreateBlogDto, req) {
    const { user } = req;
    const userId = user.userId;

    const blog = this.blogsRepository.create({
      ...createBlogDto,
      slug: slugify(createBlogDto.title),
      author: { id: userId } as User,
    });

    // save to db
    return await this.blogsRepository.save(blog);
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
    const blog = await this.blogsRepository.findOneBy({ id: id });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, req) {
    const { user } = req;
    const userId = user.id;

    const currentBlog = await this.blogsRepository.findOne({
      where: { id: id, author: { id: userId } },
    });

    if (!currentBlog) {
      throw new ForbiddenException();
    }

    // update
    await this.blogsRepository.update(id, updateBlogDto);

    return updateBlogDto;
  }

  async remove(id: number, req) {
    const { user } = req;
    const userId = user.id;

    const currentBlog = await this.blogsRepository.findOne({
      where: { id: id, author: { id: userId } },
    });

    if (!currentBlog) {
      throw new ForbiddenException();
    }

    const blog_to_delete = await this.blogsRepository.delete(id);

    if(blog_to_delete.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }
}
