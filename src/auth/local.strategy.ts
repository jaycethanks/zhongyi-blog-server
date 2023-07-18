import { Strategy } from 'passport-local';
import { Result } from 'src/admin/dto/Result.dto';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'account' });
  }
  /**
   * 请求的payload 必须匹配，否则不执行不报错，可以通过super传入 { usernameField: 'account' } options 对象
   * 将 payload 中的字段 alias 为 username/password
   * @param username
   * @param password
   * @returns
   */
  async validate(username: string, password: string): Promise<any> {
    console.log(`username: ${username}, password:${password}`);
    console.log('本地策略验证用户账密!');
    const user = await this.authService.validateUser({
      account: username,
      password,
    });
    // return 的 user 会被添加到 Request.user
    // return { hello: 'word' };
    if (!user) {
      throw new UnauthorizedException(
        Result.error('用户账户或者密码错误', 401),
      );
    }
    return user;
  }
  // async validate(adminLoginFormDto: AdminLoginFormDto): Promise<any> {
  //   console.log('[adminLoginFormDto]: ', adminLoginFormDto);
  //   const user = await this.authService.validateUser(adminLoginFormDto);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
