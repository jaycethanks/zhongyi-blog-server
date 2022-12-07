import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { AdminContentController } from './admin.content.controller';
import { AdminContentService } from './admin.content.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminContentController],
  providers: [AdminContentService],
})
export class AdminContentModule {}
