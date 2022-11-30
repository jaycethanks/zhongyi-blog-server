import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';

import { ServeStaticModule } from '@nestjs/serve-static';
//https://github.com/nestjs/serve-static
import { join } from 'path';

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
  ],
})
export class AppModule {}
