import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminAboutService } from './admin.about.service';
import { CreateAdminAboutDto } from './dto/create-admin.about.dto';
import { UpdateAdminAboutDto } from './dto/update-admin.about.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/about')
export class AdminAboutController {
  constructor(private readonly adminAboutService: AdminAboutService) {}

  @Post('upsert')
  upsert(@Req() req, @Body() createAdminAboutDto: CreateAdminAboutDto) {
    const { userid } = req.user;
    return this.adminAboutService.upsert(userid, createAdminAboutDto);
  }
  @Post()
  create(@Body() createAdminAboutDto: CreateAdminAboutDto) {
    return this.adminAboutService.create(createAdminAboutDto);
  }

  @Get()
  findAll() {
    return this.adminAboutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminAboutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminAboutDto: UpdateAdminAboutDto,
  ) {
    return this.adminAboutService.update(+id, updateAdminAboutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminAboutService.remove(+id);
  }
}
