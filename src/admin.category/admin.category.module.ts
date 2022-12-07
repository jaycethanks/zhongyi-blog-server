import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { AdminCategoryController } from './admin.category.controller';
import { AdminCategoryService } from './admin.category.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminCategoryController],
  providers: [AdminCategoryService],
})
export class AdminCategoryModule {}
