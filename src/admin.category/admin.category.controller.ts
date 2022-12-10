import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
    Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards
} from '@nestjs/common';

import { AdminCategoryService } from './admin.category.service';
import { CreateAdminCategoryDto } from './dto/create-admin.category.dto';
import { UpdateAdminCategoryDto } from './dto/update-admin.category.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/category')
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) {}

  @Post('upsert')
  upsert(@Req() req, @Body() createAdminCategoryDto: CreateAdminCategoryDto) {
    const { userid } = req.user;
    return this.adminCategoryService.upsert(userid, createAdminCategoryDto);
  }

  @Get('findall')
  findAll(@Req() req) {
    const { userid } = req.user;
    return this.adminCategoryService.findAll(userid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminCategoryDto: UpdateAdminCategoryDto,
  ) {
    return this.adminCategoryService.update(+id, updateAdminCategoryDto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  remove(@Query('catid') catid: string) {
    return this.adminCategoryService.remove(catid);
  }
}
