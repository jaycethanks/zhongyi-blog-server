import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
    Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards
} from '@nestjs/common';

import { AdminColumnService } from './admin.column.service';
import { CreateAdminColumnDto } from './dto/create-admin.column.dto';
import { UpdateAdminColumnDto } from './dto/update-admin.column.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/column')
export class AdminColumnController {
  constructor(private readonly adminColumnService: AdminColumnService) {}

  @Post('upsert')
  upsert(@Req() req, @Body() createAdminColumnDto: CreateAdminColumnDto) {
    const { userid } = req.user;

    return this.adminColumnService.upsert(userid, createAdminColumnDto);
  }

  @Get('findall')
  findAll(@Req() req) {
    const { userid } = req.user;
    return this.adminColumnService.findAll(userid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminColumnService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminColumnDto: UpdateAdminColumnDto,
  ) {
    return this.adminColumnService.update(+id, updateAdminColumnDto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  remove(@Query('colid') colid: string) {
    return this.adminColumnService.remove(colid);
  }
}
