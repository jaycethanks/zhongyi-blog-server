import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { AdminColumnController } from './admin.column.controller';
import { AdminColumnService } from './admin.column.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminColumnController],
  providers: [AdminColumnService],
})
export class AdminColumnModule {}
