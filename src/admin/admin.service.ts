import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { Result } from './dto/Result.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminLoginFormDto } from './dto/user-login-form.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  create(createAdminUserDto: CreateUserDto) {
    return 'This action adds a new adminUser';
  }

  async getUserById(userid: string) {
    console.log('[userid]: ', userid);
    const user = await this.prisma.user.findUnique({
      where: {
        userid: userid,
      },
    });
    return Result.okData(user);
  }

  findAll() {
    return `This action returns all adminUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminUser`;
  }

  update(id: number, updateAdminUserDto: UpdateUserDto) {
    return `This action updates a #${id} adminUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminUser`;
  }
}
