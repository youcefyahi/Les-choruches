import { Injectable, Inject } from '@nestjs/common';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { FirestoreService } from '../firestore/firestore.service';
import type { Auth } from 'firebase/auth';

@Injectable()
export class AdminService {
  constructor(
    @Inject('FIREBASE_AUTH') private auth: Auth,
    private firestoreService: FirestoreService
  ) { }

  async register(email: string, password: string, firstName: string, lastName: string, phone?: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;

    await this.firestoreService.createAdmin({
      email,
      firstName,
      lastName,
      phone,
      role: 'admin',
    });

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      token: await firebaseUser.getIdToken(),
      role: 'admin',
    };
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;
  
  
    const admin = await this.firestoreService.getAdminByEmail(email);
      console.log('🎉 ADMIN FFFF !',admin);

    if (!admin) {
      console.log('🎉 CONNEXION PAS !');

      console.log('=== FIN CONNEXION ===');
      throw new Error('Compte admin introuvable');
    }

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      token: await firebaseUser.getIdToken(),
      admin,
      role: 'admin',
    };
  }

  async logout() {
    await signOut(this.auth);
  }
}