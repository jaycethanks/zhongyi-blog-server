import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogPostsService {
  constructor(private readonly prisma: PrismaService) {}
  async findMany(userid: string) {
    const posts = await this.prisma.article.findMany({
      where: {
        authorId: userid,
        visible: 1,
        status: 1, // 发布
      },

      orderBy: {
        createdAt: 'desc',
      },
      take: 20, // 相当于limit
    });
    // 将password 转base64
    const encodedPosts = posts.map((post) => ({
      ...post,
      password: post.password && Buffer.from(post.password).toString('base64'),
    }));
    return encodedPosts;
  }
}
