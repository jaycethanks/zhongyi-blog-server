// import { AdminService } from 'src/admin/admin.service';

import { AdminModule } from 'src/admin/admin.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PrismaModule,
    // AdminModule,
    PassportModule,
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: jwtConstants.expiresIn },
    // }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
