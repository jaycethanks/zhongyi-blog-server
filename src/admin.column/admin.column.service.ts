import { error } from 'console';

import { Result } from '@/admin/dto/Result.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateAdminColumnDto } from './dto/create-admin.column.dto';
import { UpdateAdminColumnDto } from './dto/update-admin.column.dto';

@Injectable()
export class AdminColumnService {
  constructor(private prisma: PrismaService) {}
  async upsert(userid, createAdminColumnDto: CreateAdminColumnDto) {
    const { colid, name, description, cover, visible } = createAdminColumnDto;
    try {
      let res = null;
      if (colid) {
        // update
        res = await this.prisma.column.update({
          where: {
            colid,
          },
          data: {
            name,
            description,
            visible,
            cover,
          },
        });
      } else {
        // create
        const checkExisted = await this.prisma.column.findFirst({
          where: {
            name,
          },
        });
        if (checkExisted) {
          return Result.error('命名重复', 5001);
        }

        res = await this.prisma.column.create({
          data: {
            name,
            description,
            visible,
            userid,
            cover,
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

  async remove(colid: string) {
    try {
      const res = await this.prisma.column.delete({
        where: {
          colid,
        },
      });
      return Result.okData(res);
    } catch (error) {
      return Result.error('发生了预期之外的错误!', 5002);
    }
  }
}
