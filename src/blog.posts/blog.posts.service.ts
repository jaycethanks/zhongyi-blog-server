import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ArticleDto } from './dto/post.dto/post.dto';

@Injectable()
export class BlogPostsService {
  constructor(private readonly prisma: PrismaService) {}
  async findMany(userid: string) {
    return await this.prisma.article.findMany({
      where: {
        authorId: userid,
        visible: 1,
        status: 1, // 发布
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        category: true,
        column: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });
  }
  async findCategoires(uid: string) {
    // return await
  }
}
