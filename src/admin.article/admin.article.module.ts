import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { AdminArticleController } from './admin.article.controller';
import { AdminArticleService } from './admin.article.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminArticleController],
  providers: [AdminArticleService],
})
export class AdminArticleModule {}
