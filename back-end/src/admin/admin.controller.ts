import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('register')
  async register(@Body() body: { 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string; 
    phone?: string;
  }) {
    return await this.adminService.register(
      body.email,
      body.password,
      body.firstName,
      body.lastName,
      body.phone
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.adminService.login(body.email, body.password);
  }

  @Post('logout')
  async logout() {
    return await this.adminService.logout();
  }
}