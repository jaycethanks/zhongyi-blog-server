import { Module } from '@nestjs/common';
import { BlogAboutResolver } from './blog.about.resolver';
import { BlogAboutService } from './blog.about.service';
import { PrismaService } from '@/prisma/prisma.service';
@Module({
  providers: [BlogAboutResolver, BlogAboutService, PrismaService],
})
export class BlogAboutModule {}
