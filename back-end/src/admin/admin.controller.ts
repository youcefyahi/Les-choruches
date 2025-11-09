import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

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

  // ✅ NOUVELLE ROUTE POUR LES STATS
  @Get('stats')
  @UseGuards(AuthGuard, AdminGuard)
  async getStats() {
    try {
      const stats = await this.adminService.getStatistics();
      return {
        success: true,
        stats,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}