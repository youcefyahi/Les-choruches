import { Injectable, Inject } from '@nestjs/common';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { ApiculteurFirestoreService } from '../firestore/apiculteur-firestore.service'; // ✅ CHANGÉ
import type { Auth } from 'firebase/auth';

@Injectable()
export class AuthService {
  constructor(
    @Inject('FIREBASE_AUTH') private auth: Auth,
    private apiculteurFirestoreService: ApiculteurFirestoreService // ✅ CHANGÉ
  ) {}

  async register(email: string, password: string, firstName: string, lastName: string, phone?: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;

    await this.apiculteurFirestoreService.createApiculteur({ // ✅ CHANGÉ
      email,
      firstName,
      lastName,
      phone,
    });

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      token: await firebaseUser.getIdToken(),
    };
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;

    const apiculteur = await this.apiculteurFirestoreService.getApiculteurByEmail(email); // ✅ CHANGÉ

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      token: await firebaseUser.getIdToken(),
      apiculteur,
    };
  }

  async logout() {
    await signOut(this.auth);
  }
}