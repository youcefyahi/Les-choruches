import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    return await this.authService.register(
      body.email,
      body.password,
      body.firstName,
      body.lastName,
      body.phone
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {


    try {
      const result = await this.authService.login(body.email, body.password);

      console.log('🎉 CONNEXION RÉUSSIE !');
     
      return result;

    } catch (error) {
      console.log('❌ ERREUR CONNEXION:', error.message);
      console.log('=== FIN CONNEXION (ÉCHEC) ===');
      throw error;
    }
  }


  @Post('logout')
  async logout() {
    await this.authService.logout();
    return { message: 'Déconnecté' };
  }
}