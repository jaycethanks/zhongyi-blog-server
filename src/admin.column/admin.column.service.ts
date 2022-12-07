import { Result } from '@/admin/dto/Result.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateAdminColumnDto } from './dto/create-admin.column.dto';
import { UpdateAdminColumnDto } from './dto/update-admin.column.dto';

@Injectable()
export class AdminColumnService {
  constructor(private prisma: PrismaService) {}
  async create(userid, createAdminColumnDto: CreateAdminColumnDto) {
    const { name, description, cover, visible } = createAdminColumnDto;
    try {
      const checkExisted = await this.prisma.column.findFirst({
        where: {
          name,
        },
      });
      if (checkExisted) {
        return Result.error('命名重复', 5001);
      }
      const res = await this.prisma.column.create({
        data: {
          name,
          description,
          visible,
          userid,
          cover,
        },
      });
      return Result.okData(res);
    } catch (err) {
      return Result.error('预料之外的错误', 5002);
    }
  }

  async findAll(userid: string) {
    try {
      const res = await this.prisma.column.findMany({
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
    return `This action returns a #${id} adminColumn`;
  }

  update(id: number, updateAdminColumnDto: UpdateAdminColumnDto) {
    return `This action updates a #${id} adminColumn`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminColumn`;
  }
}
