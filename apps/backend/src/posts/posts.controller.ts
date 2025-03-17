import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';
import { instanceToPlain } from 'class-transformer';

@Controller('posts')
@UseGuards(PassportJwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('content') content: string,
    @Query('sort') sort: 'ASC' | 'DESC',
  ) {
    const posts = this.postsService.findAll({
      page,
      limit,
      search: content ? { field: 'content', query: content } : undefined,
      sort: sort ? { field: 'createdAt', order: sort } : undefined,
    });
    if (!posts) {
      throw new HttpException('Posts not found', HttpStatus.NOT_FOUND);
    }
    return posts;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const post = this.postsService.findOne(+id);
    // make sure password isn't leaked from eager
    return instanceToPlain(post);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    return this.postsService.update(+id, updatePostDto, req);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.postsService.remove(+id, req);
  }
}
