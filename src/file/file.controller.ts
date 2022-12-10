import { Express } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
    Controller, Get, Ip, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file.service';

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const { mimetype } = file;
          const validFolderName = mimetype
            .replace(/\//g, '__')
            .replace(/\./g, '_');
          const { userid } = req.user as any;
          const dest =
            process.env.NGINX_STATIC_SERVER_PATH +
            userid +
            '/' +
            validFolderName;
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    console.log('[file]: ', file);
    // const { userid } = req.user
    // const validFolderName = mimetype
    // .replace(/\//g, '__')
    // .replace(/\./g, '_');
    // process.env.NGINX_STATIC_SERVER_PATH +
    //         userid +
    //         '/' +
    //         validFolderName;

    const { filename } = file;
    return '/files/' + filename;
  }

  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: '/files' });
  }
}
