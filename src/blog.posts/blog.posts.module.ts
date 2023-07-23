import { Module } from '@nestjs/common';
import { BlogPostsResolver } from './blog.posts.resolver';
import { BlogPostsService } from './blog.posts.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  providers: [BlogPostsResolver, BlogPostsService, PrismaService],
})
export class BlogPostsModule {}
