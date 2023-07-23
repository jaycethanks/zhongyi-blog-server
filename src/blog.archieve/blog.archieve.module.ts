import { Module } from '@nestjs/common';
import { BlogArchieveResolver } from './blog.archieve.resolver';
import { BlogArchieveService } from './blog.archieve.service';
import { PrismaService } from '@/prisma/prisma.service';
@Module({
  providers: [BlogArchieveResolver, BlogArchieveService, PrismaService],
})
export class BlogArchieveModule {}
