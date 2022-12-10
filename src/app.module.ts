//https://github.com/nestjs/serve-static
import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AdminArticleModule } from './admin.article/admin.article.module';
import { AdminCategoryModule } from './admin.category/admin.category.module';
import { AdminColumnModule } from './admin.column/admin.column.module';
import { AdminContentModule } from './admin.content/admin.content.module';
import { AdminTagModule } from './admin.tag/admin.tag.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { PrismaModule } from './prisma/prisma.module';

//https://docs.nestjs.com/recipes/serve-static
// console.log('[__dirname]: ', __dirname);\
@Module({
  imports: [
    ConfigModule.forRoot(),
    // serve 静态文件, 这玩意经常不能正常serve,所以弃用了
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    //   serveRoot: '/files',
    //   //https://github.com/nestjs/serve-static/issues/26#issuecomment-590070135
    //   // 访问地址：http://localhost:4567/files/166951453039965d87517gy1h5q5jdwllrj20qo0k0dgh.jpg， 如果无效，则删除dist 目录 重启项目
    // }),
    FileModule,
    PrismaModule,
    AdminModule,
    AuthModule,
    AdminContentModule,
    AdminArticleModule,
    AdminColumnModule,
    AdminTagModule,
    AdminCategoryModule,
  ],
})
export class AppModule {}
