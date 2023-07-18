import { Injectable } from '@nestjs/common';
import { CreateAdminAboutDto } from './dto/create-admin.about.dto';
import { UpdateAdminAboutDto } from './dto/update-admin.about.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { About } from '@prisma/client';
import { Result } from '@/admin/dto/Result.dto';
@Injectable()
export class AdminAboutService {
  constructor(private prisma: PrismaService) {}

  async upsert(userid: any, createAdminAboutDto: CreateAdminAboutDto) {
    console.log('[createAdminAboutDto]: ', createAdminAboutDto);
    console.log('[userid]: ', userid);
    const { avatar, links, msg } = createAdminAboutDto;

    try {
      const res_userupdate = await this.prisma.user.update({
        data: {
          avatar,
        },
        where: {
          userid,
        },
      });
      const res_aboutcreate = await this.prisma.about.create({
        data: {
          userid,
          links,
          msg,
        },
      });

      console.log('[res_userupdate]: ', res_userupdate);
      console.log('[res_aboutcreate]: ', res_aboutcreate);
      return Result.okData({});
    } catch (e) {
      console.log('[e]: ', e);
      return Result.error('预料之外的错误', 5002);
    }
  }
  create(createAdminAboutDto: CreateAdminAboutDto) {
    return 'This action adds a new adminAbout';
  }

  findAll() {
    return `This action returns all adminAbout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminAbout`;
  }

  update(id: number, updateAdminAboutDto: UpdateAdminAboutDto) {
    return `This action updates a #${id} adminAbout`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminAbout`;
  }
}
