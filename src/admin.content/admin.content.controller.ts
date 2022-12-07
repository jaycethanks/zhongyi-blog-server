import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
    Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards
} from '@nestjs/common';

import { AdminContentService } from './admin.content.service';
import { CreateAdminContentDto } from './dto/create-admin.content.dto';
import { UpdateAdminContentDto } from './dto/update-admin.content.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/content')
export class AdminContentController {
  constructor(private readonly adminContentService: AdminContentService) {}

  @Post()
  create(@Body() createAdminContentDto: CreateAdminContentDto) {
    return this.adminContentService.create(createAdminContentDto);
  }

  @Get()
  findAll() {
    return this.adminContentService.findAll();
  }

  @Get('getCounts')
  getCount(@Query() query, @Req() req) {
    const { type } = query;
    const { userid } = req.user;
    return this.adminContentService.getCount(type, userid);
  }

  @Get(':id')
  findOne(@Query() query, @Param('id') id: string) {
    return this.adminContentService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminContentDto: UpdateAdminContentDto,
  ) {
    return this.adminContentService.update(+id, updateAdminContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminContentService.remove(+id);
  }
}
