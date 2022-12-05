import { Strategy } from 'passport-local';
import { AdminLoginFormDto } from 'src/admin/dto/user-login-form.dto';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('work?agin??');
    // const user = await this.authService.validateUser(username, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}
