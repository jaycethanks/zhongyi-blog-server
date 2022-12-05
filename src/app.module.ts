//https://github.com/nestjs/serve-static
import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { PrismaModule } from './prisma/prisma.module';

//https://docs.nestjs.com/recipes/serve-static
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/files',
      //https://github.com/nestjs/serve-static/issues/26#issuecomment-590070135
      // 访问地址：http://localhost:4567/files/166951453039965d87517gy1h5q5jdwllrj20qo0k0dgh.jpg， 如果无效，则删除dist 目录 重启项目
    }),
    FileModule,
    PrismaModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
