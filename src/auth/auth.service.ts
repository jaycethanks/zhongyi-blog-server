import { AdminService } from 'src/admin/admin.service';
import { AdminLoginFormDto } from 'src/admin/dto/user-login-form.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable, NotFoundException } from '@nestjs/common';

// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // private jwtService: JwtService, // private adminService: AdminService,
  ) {}

  async login(adminUserLoginForm: AdminLoginFormDto) {
    return await this.validateUser(adminUserLoginForm);
    return {
      // access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(adminUserLoginForm: AdminLoginFormDto): Promise<any> {
    const { account, password } = adminUserLoginForm;
    // 账户验存
    const userExist = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: account,
          },
          {
            phone: account,
          },
        ],
      },
    });

    if (!userExist) {
      return {
        code: 400,
        message: '用户不存在',
      };
    }

    // 密码查验

    const passwordCheck = await this.prisma.user.findFirst({
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
    if (!passwordCheck) {
      return {
        code: 401,
        message: '密码错误',
      };
    }

    return {
      code: 200,
      data: passwordCheck,
    };
  }
}
