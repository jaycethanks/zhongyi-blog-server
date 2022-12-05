import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { AdminUserController } from './admin.controller';
import { AdminUserService } from './admin.service';

@Module({
  controllers: [AdminUserController],
  providers: [AdminUserService],
  imports: [PrismaModule],
})
export class AdminModule {}
