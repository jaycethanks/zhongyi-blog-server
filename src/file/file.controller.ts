import { Express } from 'express';
import { mkdir } from 'fs';
import { diskStorage } from 'multer';
import { hostname } from 'os';
import { join } from 'path';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
        // https://github.com/expressjs/multer#diskstorage 如果是字符串,会自动创建目录 , 如果是函数,则需要手动创建
        // destination: '/usr/local/blog-assets/6233d7c7-ca89-4230-9f17-6c62c018dac9/',
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
          mkdir(dest, { recursive: true }, (err, path) => {
            cb(null, dest);
          });
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    // file.path 示例: path: '/usr/local/blog-assets/6233d7c7-ca89-4230-9f17-6c62c018dac9/image__jpeg/1671479988381wallhaven-l35pw2.jpg'
    // process.env.NGINX_STATIC_SERVER_PATH +
    // 相对于Nginx root 的path
    const relativePath = file.path
      .split(process.env.NGINX_STATIC_SERVER_PATH)
      .pop();

    // 返回前端实际的访问地址,

    // 前端能够直接访问的url 示例:http://192.168.3.46:8989/6233d7c7-ca89-4230-9f17-6c62c018dac9/image__jpeg/1671479988381wallhaven-l35pw2.jpg
    // 6233d7c7-ca89-4230-9f17-6c62c018dac9/image__jpeg/1671479988381wallhaven-l35pw2.jpg
    return '/file/' + relativePath; // 用nginx 配置重定向
  }

  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: '/files' });
  }
}
