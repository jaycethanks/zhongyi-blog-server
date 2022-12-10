import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { AdminTagService } from './admin.tag.service';
import { CreateAdminTagDto } from './dto/create-admin.tag.dto';
import { UpdateAdminTagDto } from './dto/update-admin.tag.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/tag')
export class AdminTagController {
  constructor(private readonly adminTagService: AdminTagService) {}

  @Post('upsert')
  upsert(@Req() req, @Body() createAdminTagDto: CreateAdminTagDto) {
    const { userid } = req.user;

    return this.adminTagService.upsert(userid, createAdminTagDto);
  }

  @Get('findall')
  findAll(@Req() req) {
    const { userid } = req.user;
    return this.adminTagService.findAll(userid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminTagService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminTagDto: UpdateAdminTagDto,
  ) {
    return this.adminTagService.update(+id, updateAdminTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminTagService.remove(+id);
  }
}
