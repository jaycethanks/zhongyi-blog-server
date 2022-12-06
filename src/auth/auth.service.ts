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
    const payload = { username: name, userid: userid };
    // const payload = { username: name, sub: userid };
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

    /**
     * 此处的 null 将return 至src/auth/local.strategy.ts - validate 方法
     * validate 方法期望将返回结果 附加到 Request 请求对象上，
     * 如果返回 null 则证明用户凭证验证失败，就不会颁发 jwt token
     * 因此这里当用户验证失败只能 return null
     */
    return user;
  }
}
