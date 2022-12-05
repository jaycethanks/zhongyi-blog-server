import { AuthService } from 'src/auth/auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AdminUserController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminUserController],
  providers: [AdminService],
  imports: [
    PrismaModule,
    AuthModule,
    // AuthService,
  ],
  exports: [AdminService],
})
export class AdminModule {}
