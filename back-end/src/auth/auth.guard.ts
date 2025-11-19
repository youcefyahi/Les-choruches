import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('FIREBASE_ADMIN') private admin: any) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      const decodedToken = await this.admin.auth().verifyIdToken(token);
      
      // ✅ IMPORTANT : Ajoute l'email ici !
      request['user'] = {
        id: decodedToken.uid,
        email: decodedToken.email  // ← AJOUTE L'EMAIL
      };
      
      console.log('🔑 AuthGuard - Token décodé:', decodedToken.uid);
      console.log('👤 AuthGuard - req.user défini:', request['user']);
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}