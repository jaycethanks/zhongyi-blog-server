import { Result } from '@/admin/dto/Result.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateAdminTagDto } from './dto/create-admin.tag.dto';
import { UpdateAdminTagDto } from './dto/update-admin.tag.dto';

@Injectable()
export class AdminTagService {
  constructor(private prisma: PrismaService) {}
  async create(userid: string, createAdminTagDto: CreateAdminTagDto) {
    const { name, visible } = createAdminTagDto;
    try {
      const checkExisted = await this.prisma.tag.findFirst({
        where: {
          name,
        },
      });
      if (checkExisted) {
        return Result.error('命名重复', 5001);
      }
      const res = await this.prisma.tag.create({
        data: {
          name,
          visible,
          userid,
        },
      });
      return Result.okData(res);
    } catch (err) {
      return Result.error('预料之外的错误', 5002);
    }
  }

  async findAll(userid: string) {
    try {
      const res = await this.prisma.tag.findMany({
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
    return `This action returns a #${id} adminTag`;
  }

  update(id: number, updateAdminTagDto: UpdateAdminTagDto) {
    return `This action updates a #${id} adminTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminTag`;
  }
}
