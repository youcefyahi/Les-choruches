import { Injectable, Inject } from '@nestjs/common';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { AdminFirestoreService } from '../firestore/admin-firestore.service';
import type { Auth } from 'firebase/auth';
import * as admin from 'firebase-admin';

@Injectable()
export class AdminService {
  constructor(
    @Inject('FIREBASE_AUTH') private auth: Auth,
    private firestoreService: AdminFirestoreService
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

    const adminUser = await this.firestoreService.getAdminByEmail(email);
    console.log('🎉 ADMIN TROUVÉ :', adminUser);

    if (!adminUser) {
      console.log('❌ CONNEXION ÉCHOUÉE - Admin introuvable');
      throw new Error('Compte admin introuvable');
    }

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      token: await firebaseUser.getIdToken(),
      admin: adminUser,
      role: 'admin',
    };
  }

  async logout() {
    await signOut(this.auth);
  }

  async getStatistics() {
    // ✅ Utilise directement admin.firestore() au lieu de getFirestore()
    const db = admin.firestore();

    // Compter les apiculteurs
    const apiculteursSnapshot = await db.collection('apiculteurs').get();
    const nombreApiculteurs = apiculteursSnapshot.size;

    // Compter les entreprises
    const entreprisesSnapshot = await db.collection('entreprises').get();
    const nombreEntreprises = entreprisesSnapshot.size;

    // Compter les comptes rendus
    const comptesRendusSnapshot = await db.collection('comptes_rendus').get();
    const nombreComptesRendus = comptesRendusSnapshot.size;

    // Compter les comptes rendus en attente
    const comptesRendusEnAttenteSnapshot = await db
      .collection('comptes_rendus')
      .where('statut', '==', 'en_attente_validation')
      .get();
    const nombreComptesRendusEnAttente = comptesRendusEnAttenteSnapshot.size;

    return {
      nombreApiculteurs,
      nombreEntreprises,
      nombreComptesRendus,
      nombreComptesRendusEnAttente,
    };
  }
}