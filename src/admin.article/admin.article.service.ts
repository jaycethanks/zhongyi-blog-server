import { error } from 'console';

import { Result } from '@/admin/dto/Result.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Res } from '@nestjs/common';

import { CreateAdminArticleDto } from './dto/create-admin.article.dto';
import { UpdateAdminArticleDto } from './dto/update-admin.article.dto';

@Injectable()
export class AdminArticleService {
  constructor(private prisma: PrismaService) {}

  async create(userid: string, createAdminArticleDto: CreateAdminArticleDto) {
    const {
      title,
      content,
      isbanner,
      description,
      cover,
      password,
      visible,
      tags,
      status,
      column,
      category,
    } = createAdminArticleDto;
    try {
      const res = await this.prisma.article.create({
        data: {
          title,
          content,
          author: {
            connect: {
              userid: userid,
            },
          },
          banner: isbanner ? 1 : 0,
          description,
          cover,
          password,
          visible,
          status,
          column: column
            ? {
                connect: {
                  colid: column ? column : undefined,
                },
              }
            : undefined,
          category: category
            ? {
                connect: {
                  catid: category,
                },
              }
            : undefined,
          tags:
            tags.length > 0
              ? {
                  create: tags.map((_tag) => ({
                    tag: {
                      connectOrCreate: {
                        create: {
                          name: _tag,
                          userid: userid,
                        },
                        where: {
                          tagid: _tag,
                        },
                      },
                    },
                  })),
                }
              : undefined,
        },
      });
      return Result.okData(res);
    } catch (error) {
      console.log('[error]: ', error);
      return Result.error('文章添加出现了预料之外的错误!', 5002);
    }
  }

  async findAll(userid: string, type: 1 | 0) {
    try {
      const res = await this.prisma.article.findMany({
        select: {
          artid: true,
          title: true,
          description: true,
          cover: true,
          createdAt: true,
          readers: true,
          liking: true,
          visible: true,
          comments: true,
          password: true,
        },
        where: {
          authorId: userid,
          status: +type, // 网络请求传过来会是string
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return Result.okData(res);
    } catch (error) {
      console.log('[error]: ', error);
      return Result.error('文章查询遇到了预期之外的错误', 5002);
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.prisma.article.findUnique({
        where: {
          artid: id,
        },
        include: {
          column: {
            select: {
              colid: true,
            },
          },
          tags: {
            select: {
              tagid: true,
            },
          },
          category: {
            select: {
              catid: true,
            },
          },
        },
      });
      return Result.okData(res);
    } catch (error) {
      return Result.error('根据id查询文章的时候遇到了预期之外的错误!', 5002);
    }
  }

  update(id: number, updateAdminArticleDto: UpdateAdminArticleDto) {
    return `This action updates a #${id} adminArticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminArticle`;
  }
}
