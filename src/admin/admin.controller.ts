import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminLoginFormDto } from './dto/user-login-form.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard) // or  @UseGuards(AuthGuard('local'))
  @Post('login/account')
  @ApiOperation({ summary: '用户登陆' })
  async login(@Req() req) {
    console.log('[req.user]: ', req.user);
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('currentUser/')
  getUserById(@Req() req) {
    const { userid, username } = req.user;
    return this.adminService.getUserById(userid);
  }

  @Post()
  create(@Body() createAdminUserDto: CreateUserDto) {
    return this.adminService.create(createAdminUserDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminUserDto: UpdateUserDto) {
    return this.adminService.update(+id, updateAdminUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
