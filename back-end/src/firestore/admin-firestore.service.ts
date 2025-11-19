import { Injectable } from '@nestjs/common';
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { BaseFirestoreService } from './base-firestore.service';
import { Admin } from '../Models/Admin';

@Injectable()
export class AdminFirestoreService extends BaseFirestoreService {
  private readonly collectionName = 'admins';

  /**
   * Créer un nouvel administrateur
   * ✅ Filtre automatiquement les valeurs undefined
   */
  async createAdmin(admin: Omit<Admin, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();

    // Filtrer les undefined pour éviter les erreurs Firestore
    const cleanAdmin = Object.fromEntries(
      Object.entries(admin).filter(([_, value]) => value !== undefined)
    );

    const docRef = await addDoc(collection(this.firestore, this.collectionName), {
      ...cleanAdmin,
      role: 'admin',
      createdAt: now,
      updatedAt: now,
    });
    
    return docRef.id;
  }

  /**
   * Récupérer un admin par email
   */
  async getAdminByEmail(email: string): Promise<Admin | null> {
    const q = query(
      collection(this.firestore, this.collectionName), 
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Admin;
  }
}