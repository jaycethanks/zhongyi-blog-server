import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { AdminTagController } from './admin.tag.controller';
import { AdminTagService } from './admin.tag.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminTagController],
  providers: [AdminTagService],
})
export class AdminTagModule {}
