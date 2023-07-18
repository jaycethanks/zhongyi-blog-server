import { Module } from '@nestjs/common';
import { AdminAboutService } from './admin.about.service';
import { AdminAboutController } from './admin.about.controller';
import { PrismaModule } from '@/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [AdminAboutController],
  providers: [AdminAboutService],
})
export class AdminAboutModule {}
