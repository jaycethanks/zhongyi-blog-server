import { error } from 'console';

import { Result } from '@/admin/dto/Result.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Res } from '@nestjs/common';

import { CreateAdminArticleDto } from './dto/create-admin.article.dto';
import { UpdateAdminArticleDto } from './dto/update-admin.article.dto';

@Injectable()
export class AdminArticleService {
  constructor(private prisma: PrismaService) {}

  async upsert(userid: string, createAdminArticleDto: CreateAdminArticleDto) {
    const {
      artid,
      title,
      content,
      banner,
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
      let res = null;
      const data = {
        title,
        content,
        author: {
          connect: {
            userid: userid,
          },
        },
        banner: banner ? 1 : 0,
        description,
        cover,
        password,
        visible,
        status,
        column: column
          ? {
              connect: {
                colid: column,
              },
            }
          : undefined,
        category: category
          ? {
              connect: {
                catid: category,
              },
              update: {
                relateCount: {
                  increment: 1,
                },
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
      };
      if (artid) {
        // update
        // break all relations fisrt
        await this.prisma.tagsOnArticles.deleteMany({
          where: {
            artid: artid,
          },
        });
        await this.prisma.article.update({
          where: {
            artid: artid,
          },
          data: {
            column: {
              disconnect: true, // disconnect one record (https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-a-related-record)
            },
            category: {
              disconnect: true,
              update: {
                relateCount: {
                  decrement: 1,
                },
              },
            },
            tags: {
              set: [], // disconnect all related records (https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-all-related-records)
            },
          },
        });
        //  重新创建
        res = await this.prisma.article.update({
          where: {
            artid,
          },
          data,
        });
      } else {
        // create
        res = await this.prisma.article.create({
          data,
        });
      }

      // 更新分类关联表的 关联数量字段
      // if (column) {
      //   // 如果 文章 携带了 分类： 1. 先去查有没有历史关联， 如果有， 则不需要操作，否则关联数 +1
      //   const  hasRelatedCol = await this.prisma.
      // }

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
