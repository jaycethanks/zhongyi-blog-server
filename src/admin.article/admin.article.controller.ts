import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AdminArticleService } from './admin.article.service';
import { CreateAdminArticleDto } from './dto/create-admin.article.dto';
import { UpdateAdminArticleDto } from './dto/update-admin.article.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/article')
export class AdminArticleController {
  constructor(private readonly adminArticleService: AdminArticleService) {}

  @Post('upsert')
  @ApiOperation({ summary: '根据jwt解析userid,获取用户信息' })
  upsert(@Req() req, @Body() createAdminArticleDto: CreateAdminArticleDto) {
    const { userid } = req.user;
    return this.adminArticleService.upsert(userid, createAdminArticleDto);
  }

  @Get('findall')
  findAll(@Req() req, @Query() query) {
    const { type } = query;
    const { userid } = req.user;
    return this.adminArticleService.findAll(userid, type);
  }

  @Get('findById')
  findOne(@Query('artid') id: string) {
    return this.adminArticleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminArticleDto: UpdateAdminArticleDto,
  ) {
    return this.adminArticleService.update(+id, updateAdminArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminArticleService.remove(+id);
  }
}
