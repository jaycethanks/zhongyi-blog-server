import { ArticleDto } from '@/blog.posts/dto/post.dto/post.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ArchieveAppendInput } from './dto/archieve-append.input/archieve-append.input.ts/archieve-append.input.ts';

@Injectable()
export class BlogArchieveService {
  constructor(private readonly prisma: PrismaService) {}
  // perMaxSize 指的是查询时， 每个年份最多返回多少条目数
  async findMany(userid: string, perMaxSize = 5) {
    const res = await this.prisma.article.findMany({
      where: {
        authorId: userid,
        visible: 1,
        status: 1, // 发布
      },
      select: {
        artid: true,
        authorId: true,
        title: true,
        createdAt: true,
        description: true,
      },
    });
    if (!res) return [];

    // 用 map 将文章 按 年份 分组
    const map = new Map<string, Array<ArticleDto>>(null);
    console.log('perMaxSize', perMaxSize);
    res.forEach((it) => {
      const year = new Date(it.createdAt).getFullYear().toString();
      // 这里 undefined 指的是不做任何操作
      map.has(year)
        ? map.get(year).length >= perMaxSize
          ? undefined
          : map.get(year).push(it)
        : map.set(year, [it]);
    });
    // 将 map 转 二维数组
    const year_posts = [...map.entries()];
    const data = year_posts.map(([year, posts]) => ({ year, posts }));
    // 降序并返回
    const sort = data.sort((a, b) => +b.year - +a.year);
    return sort;
  }

  async queryMore(archieveAppendInput: ArchieveAppendInput, userid: string) {
    console.log('archieveAppendInput', archieveAppendInput);
    const { size, start, year } = archieveAppendInput;
    const res = await this.prisma.article.findMany({
      where: {
        authorId: userid,
        visible: 1,
        status: 1, // 发布
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${Number(year) + 1}-01-01`),
        },
      },
    });

    return res.splice(start, size);
  }
}
