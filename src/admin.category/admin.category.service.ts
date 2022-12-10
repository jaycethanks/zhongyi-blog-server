import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { Result } from '../admin/dto/Result.dto';
import { CreateAdminCategoryDto } from './dto/create-admin.category.dto';
import { UpdateAdminCategoryDto } from './dto/update-admin.category.dto';

@Injectable()
export class AdminCategoryService {
  constructor(private prisma: PrismaService) {}
  async upsert(userid, createAdminCategoryDto: CreateAdminCategoryDto) {
    const { catid, name, description, visible } = createAdminCategoryDto;
    try {
      let res = null;
      if (catid) {
        // update
        res = await this.prisma.category.update({
          where: {
            catid,
          },
          data: {
            name,
            description,
            visible,
          },
        });
      } else {
        // create
        const checkExisted = await this.prisma.category.findFirst({
          where: {
            name,
          },
        });
        if (checkExisted) {
          return Result.error('命名重复', 5001);
        }

        res = await this.prisma.category.create({
          data: {
            userid,
            name,
            description,
            visible,
          },
        });
      }

      return Result.okData(res);
    } catch (err) {
      return Result.error('预料之外的错误', 5002);
    }
  }

  async findAll(userid: string) {
    try {
      const res = await this.prisma.category.findMany({
        where: {
          userid,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      if (!res) {
        return Result.okData([]);
      }
      return Result.okData(res);
    } catch (err) {
      return Result.error('预料之外的错误', 5002);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} adminCategory`;
  }

  update(id: number, updateAdminCategoryDto: UpdateAdminCategoryDto) {
    return `This action updates a #${id} adminCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminCategory`;
  }
}
