import {
  Controller,
  Post,
  ServiceUnavailableException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ImageResponseDto } from './dto/image-response-dto';
import { plainToInstance } from 'class-transformer';

@Controller('upload')
export class UploadController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const image = this.cloudinaryService.uploadFile(file);
      return plainToInstance(ImageResponseDto, image);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
