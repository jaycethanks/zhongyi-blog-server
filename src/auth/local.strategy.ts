import { Strategy } from 'passport-local';
import { AdminLoginFormDto } from 'src/admin/dto/user-login-form.dto';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    console.log('work??');
    // const user = await this.authService.validateUser(username, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
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
