import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { Inject } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      throw new ForbiddenException('Non authentifié');
    }

    // Vérifier si l'utilisateur est admin
    const userDoc = await this.firestore.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      throw new ForbiddenException('Utilisateur introuvable');
    }

    const userData = userDoc.data();
    
    if (userData?.role !== 'admin') {
      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    return true;
  }
}