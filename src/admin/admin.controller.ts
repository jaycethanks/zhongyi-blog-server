import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { AdminUserService } from './admin.service';
import { CreateAdminUserDto } from './dto/create-user.dto';
import { UpdateAdminUserDto } from './dto/update-user.dto';
import { AdminUserLoginForm } from './dto/user-login-form.dto';

@Controller('admin')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post('login/account')
  login(@Body() adminUserLoginForm: AdminUserLoginForm) {
    console.log('receive');
    return this.adminUserService.login(adminUserLoginForm);
  }

  @Get('currentUser/:id')
  getUserById(@Param('id') userid: string) {
    return this.adminUserService.getUserById(userid);
  }

  @Post()
  create(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.adminUserService.create(createAdminUserDto);
  }

  @Get()
  findAll() {
    return this.adminUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ) {
    return this.adminUserService.update(+id, updateAdminUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUserService.remove(+id);
  }
}
