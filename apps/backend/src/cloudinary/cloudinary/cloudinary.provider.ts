import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryProvider {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get('cloud.cloud_name'),
      api_key: configService.get('cloud.api_key'),
      api_secret: configService.get('cloud.api_secret'),
    });
  }
}
