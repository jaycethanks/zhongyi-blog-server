import { Injectable } from '@nestjs/common';
import { CreateAdminAboutDto } from './dto/create-admin.about.dto';
import { UpdateAdminAboutDto } from './dto/update-admin.about.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Result } from '@/admin/dto/Result.dto';
@Injectable()
export class AdminAboutService {
  constructor(private prisma: PrismaService) {}

  async upsert(userid: string, createAdminAboutDto: CreateAdminAboutDto) {
    const { avatar, links, msg } = createAdminAboutDto;
    try {
      const [res_userupdate, res_aboutcreate] = await Promise.all([
        this.prisma.user.update({
          data: {
            avatar,
          },
          where: {
            userid,
          },
        }),
        this.prisma.about.upsert({
          create: {
            links,
            msg,
            user: {
              connect: {
                userid,
              },
            },
          },
          update: {
            links,
            msg,
          },
          where: {
            userid,
          },
        }),
      ]);
      return Result.okData({ usr: res_userupdate, about: res_aboutcreate });
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

  async findOne(userid: string) {
    try {
      const [res_avatar, res_about] = await Promise.all([
        this.prisma.user.findUnique({
          select: {
            avatar: true,
          },
          where: {
            userid: userid,
          },
        }),
        this.prisma.about.findFirst({
          select: {
            links: true,
            msg: true,
          },
          where: {
            userid,
          },
          orderBy: {
            createdAt: 'asc',
          },
        }),
      ]);
      return Result.okData({ avatar: res_avatar.avatar, ...res_about });
    } catch (e) {
      console.log('[e]: ', e);
      return Result.error('预料之外的错误', 5002);
    }
  }

  update(id: number, updateAdminAboutDto: UpdateAdminAboutDto) {
    return `This action updates a #${id} adminAbout`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminAbout`;
  }
}
