import { Result } from '@/admin/dto/Result.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateAdminContentDto } from './dto/create-admin.content.dto';
import { UpdateAdminContentDto } from './dto/update-admin.content.dto';

@Injectable()
export class AdminContentService {
  constructor(private prisma: PrismaService) {}

  async getCount(
    type: 'articles' | 'drafts' | 'tags' | 'columns' | 'categorys',
    userid: string,
  ) {
    // this.prisma
    let res;
    switch (type) {
      case 'articles':
        res = await this.prisma.article.count({
          where: {
            authorId: userid,
            status: 1, // 发布
          },
        });
        break;
      case 'drafts':
        res = await this.prisma.article.count({
          where: {
            authorId: userid,
            status: 0, // 发布
          },
        });
        break;
      case 'tags':
        res = await this.prisma.tag.count({
          where: {
            userid,
          },
        });
        break;
      case 'columns':
        res = await this.prisma.column.count({
          where: {
            userid,
          },
        });
        break;
      case 'categorys':
        res = await this.prisma.category.count({
          where: {
            userid,
          },
        });
        break;
      default:
        res = 0;
        '';
    }
    return Result.okData(res);
  }
  create(createAdminContentDto: CreateAdminContentDto) {
    return 'This action adds a new adminContent';
  }

  findAll() {
    return `This action returns all adminContent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminContent`;
  }

  update(id: number, updateAdminContentDto: UpdateAdminContentDto) {
    return `This action updates a #${id} adminContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminContent`;
  }
}
