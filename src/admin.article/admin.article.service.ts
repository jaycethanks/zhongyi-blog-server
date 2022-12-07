import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateAdminArticleDto } from './dto/create-admin.article.dto';
import { UpdateAdminArticleDto } from './dto/update-admin.article.dto';

@Injectable()
export class AdminArticleService {
  constructor(private prisma: PrismaService) {}

  create(userid: string, createAdminArticleDto: CreateAdminArticleDto) {
    const {
      title,
      content,
      isbanner,
      description,
      cover,
      password,
      visible,
      tags,
      column,
      category,
    } = createAdminArticleDto;
    // const t_tags = await this.prisma.tag.findMany();
    // this.prisma.columnsOnArticles.create({
    //   data:{
    //     artid
    //   }
    // })
    this.prisma.article.create({
      data: {
        title,
        content,
        authorId: userid,
        banner: isbanner ? 1 : 0,
        description,
        cover,
        password,
        visible,
        columns:{
          connect:{
            artid_colid
          }
        }
        // columns: {
        //   connect: {
        //     column
        //   },
        // },
        // columns:{
        //   create:{

        //   }
        // },
        // tags:{
        //   connectOrCreate:{
        //     where:{
        //       tagid:{in}
        //     }
        //   }
        // },
        categories:{
          connect:{
            artid_catid:{
              in:
            },
          }
        }
      },
    });
    return 'This action adds a new adminArticle';
  }

  findAll() {
    return `This action returns all adminArticle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminArticle`;
  }

  update(id: number, updateAdminArticleDto: UpdateAdminArticleDto) {
    return `This action updates a #${id} adminArticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminArticle`;
  }
}
