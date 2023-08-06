import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ArticleDto } from './dto/post.dto/post.dto';
import { encode2Base64 } from '@/utils';

@Injectable()
export class BlogPostsService {
  constructor(private readonly prisma: PrismaService) {}
  async findPostsListByCatid(userid: any, catid: string) {
    return this.prisma.article.findMany({
      where: {
        authorId: userid,
        catid: catid,
        visible: 1,
        status: 1, // 发布
      },
      include: {
        author: true,
        category: true,
        column: true,
        tags: true,
        comments: true,
      },
    });
  }
  async findById(userid: string, artid: string) {
    const res = await this.prisma.article.findFirstOrThrow({
      where: {
        // artid,
        artid,
        authorId: userid,
        visible: 1,
        status: 1, // 发布
      },
      include: {
        author: true,
        category: true,
        column: true,
        tags: true,
        comments: true,
      },
    });
    res.password && (res.password = encode2Base64(res.password));
    return res;
  }
  async findMany(userid: string) {
    // 模拟延时 2 秒

    // await new Promise((resolve) => setTimeout(resolve, 2000));
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
  async findCategoires(userid: string) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return await this.prisma.category.findMany({
      where: {
        userid: userid,
      },
    });
  }
}
