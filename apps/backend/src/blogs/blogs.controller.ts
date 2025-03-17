import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(PassportJwtAuthGuard, RolesGuard)
  create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return this.blogsService.create(createBlogDto, req);
  }

  @Get()
  @UseGuards(PassportJwtAuthGuard)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('content') content: string,
    @Query('sort') sort: 'ASC' | 'DESC',
  ) {
    const blogs = this.blogsService.findAll({
      page,
      limit,
      search: content ? { field: 'content', query: content } : undefined,
      sort: sort ? { field: 'createdAt', order: sort } : undefined,
    });

    if (!blogs) {
      throw new HttpException('Blogs not found', HttpStatus.NOT_FOUND);
    }

    return blogs;
  }

  @Get(':id')
  @UseGuards(PassportJwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(PassportJwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req,
  ) {
    return this.blogsService.update(+id, updateBlogDto, req);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(PassportJwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.blogsService.remove(+id, req);
  }
}
