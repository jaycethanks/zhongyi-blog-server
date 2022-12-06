import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.SECRET,
    });
  }

  /**
   * 将会解析请求中的 jwt token, 接续出 userid 和 username
   * 至于为什么解析的是 userid 和 username, 这是因为在颁发令牌的是时候，就混淆进了这两个信息。
   * 颁发令牌的逻辑， 由  login/account 路由 handle. 通过 @UseGuards(LocalAuthGuard)  注解
   * 注入了 passport-local 策略，即 src/auth/local.strategy.ts
   * 其中，validate 方法执行返回非 null 并附加在Request上后，@UseGuards 工作完成，然后
   * 继续路由 request handle 管道，执行实际的 return this.authService.login(req.user) 方法
   * 将 jwt token 返回。
   * @param payload
   * @returns
   */
  async validate(payload: any) {
    console.log('[解析token中携带的 userid + username]');
    return { userid: payload.userid, username: payload.username };
  }
}
