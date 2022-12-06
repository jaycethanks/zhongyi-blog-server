import { AuthService } from 'src/auth/auth.service';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminLoginFormDto } from './dto/user-login-form.dto';

@Controller('admin')
export class AdminUserController {
  constructor(
    private readonly adminUserService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard) // or  @UseGuards(AuthGuard('local'))
  @Post('login/account')
  @ApiOperation({ summary: '用户登陆' })
  async login(@Req() req) {
    this.authService.login(req.user);
    return this.authService.login(req.user);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('currentUser/')
  getUserById(@Param('id') userid: string) {
    return this.adminUserService.getUserById(userid);
  }

  @Post()
  create(@Body() createAdminUserDto: CreateUserDto) {
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
  update(@Param('id') id: string, @Body() updateAdminUserDto: UpdateUserDto) {
    return this.adminUserService.update(+id, updateAdminUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUserService.remove(+id);
  }
}
