import { error } from 'console';
import { AdminService } from 'src/admin/admin.service';
import { Result } from 'src/admin/dto/Result.dto';
import { AdminLoginFormDto } from 'src/admin/dto/user-login-form.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService, // // private adminService: AdminService,
  ) {}

  async login(user) {
    const { userid, name } = user;
    const payload = { username: name, sub: userid };
    return Result.okData({
      access_token: this.jwtService.sign(payload),
    });
  }

  async validateUser(adminUserLoginForm: AdminLoginFormDto): Promise<Result> {
    const { account, password } = adminUserLoginForm;
    // 密码查验

    const user = await this.prisma.user.findFirst({
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
    if (!user) {
      return Result.error('账户名或者密码不正确');
    }

    return Result.okData(user);
  }
}
