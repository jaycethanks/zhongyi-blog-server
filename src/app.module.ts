import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
//https://github.com/nestjs/serve-static
import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
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
import {FooResolver} from "./graqlQLResolver/graqlQLResolver.module"//https://stackoverflow.com/a/64106012/12261182
import { CoffeesModule } from './coffees/coffees.module';

//https://docs.nestjs.com/recipes/serve-static
// console.log('[__dirname]: ', __dirname);\
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // https://docs.nestjs.com/graphql/quick-start
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      sortSchema: true,
      buildSchemaOptions:{
        numberScalarMode: 'integer',
      }
      
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    // ConfigModule.forRoot(),
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
    FooResolver,
    CoffeesModule//https://stackoverflow.com/a/64106012/12261182
  ],
})
export class AppModule {}
