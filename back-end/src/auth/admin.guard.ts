import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { collection, query, where, getDocs } from 'firebase/firestore';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@Inject('FIRESTORE') private firestore: any) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    const userEmail = request.user?.email;

    console.log('🔐 AdminGuard - Vérification admin pour:', userEmail);

    if (!userId || !userEmail) {
      throw new ForbiddenException('Non authentifié');
    }

    // ✅ Cherche l'admin par EMAIL, pas par ID de document
    const adminsRef = collection(this.firestore, 'admins');
    const q = query(adminsRef, where('email', '==', userEmail));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('❌ AdminGuard - Aucun admin trouvé avec cet email');
      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    const adminData = snapshot.docs[0].data();

    if (adminData?.role !== 'admin') {
      console.log('❌ AdminGuard - Role incorrect:', adminData?.role);
      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    console.log('✅ AdminGuard - Admin autorisé:', userEmail);
    return true;
  }
}