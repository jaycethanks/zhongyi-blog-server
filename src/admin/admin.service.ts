import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateAdminUserDto } from './dto/create-user.dto';
import { UpdateAdminUserDto } from './dto/update-user.dto';
import { AdminUserLoginForm } from './dto/user-login-form.dto';

@Injectable()
export class AdminUserService {
  constructor(private prisma: PrismaService) {}
  create(createAdminUserDto: CreateAdminUserDto) {
    return 'This action adds a new adminUser';
  }
  async login(adminUserLoginForm: AdminUserLoginForm) {
    const { account, password } = adminUserLoginForm;
    const result = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: account,
            password: password,
          },
          {
            phone: account,
            password: password,
          },
        ],
      },
    });
    if (result) {
      return {
        status: 'ok',
        type: 'account',
        currentAuthority: 'asjdlANLNDASLKNDASNDASASDASNFKAS',
      };
    } else {
      return {
        status: 'error',
        type: 'account',
        currentAuthority: 'guest',
      };
    }
  }

  async getUserById(userid) {
    const result = await this.prisma.user.findUnique({
      where: {
        userid: userid,
      },
    });
    if (result) {
      return {
        data: result,
        success: true,
      };
    } else {
      return {
        data: {},
        success: true,
        errorCode: '401',
        errorMessage: '请先登录！',
      };
    }
  }

  findAll() {
    return `This action returns all adminUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminUser`;
  }

  update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    return `This action updates a #${id} adminUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminUser`;
  }
}
