import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('upload')
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    const result = await this.uploadService.uploadAudio(file, req.user.id);
    return { success: true, ...result };
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    const result = await this.uploadService.uploadPhoto(file, req.user.id);
    return { success: true, ...result };
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    const result = await this.uploadService.uploadVideo(file, req.user.id);
    return { success: true, ...result };
  }
}