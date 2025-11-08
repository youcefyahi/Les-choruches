import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('FIREBASE_ADMIN') private admin: any) { } // ← Injecter

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      const decodedToken = await this.admin.auth().verifyIdToken(token);
      console.log('🔑 AuthGuard - Token décodé:', decodedToken.uid);

      request['user'] = {
        id: decodedToken.uid,
        email: decodedToken.email
      };

      console.log('👤 AuthGuard - req.user défini:', request['user'].id);

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