import { Injectable } from '@nestjs/common';
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { BaseFirestoreService } from './base-firestore.service';
import { Apiculteur } from '../Models/Apiculteur';

@Injectable()
export class ApiculteurFirestoreService extends BaseFirestoreService {
  private readonly collectionName = 'apiculteurs';

  /**
   * Créer un nouvel apiculteur
   */
  async createApiculteur(apiculteur: Omit<Apiculteur, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(this.firestore, this.collectionName), {
      ...apiculteur,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  /**
   * Récupérer un apiculteur par ID
   */
  async getApiculteur(id: string): Promise<Apiculteur | null> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Apiculteur;
  }

  /**
   * Récupérer un apiculteur par email
   */
  async getApiculteurByEmail(email: string): Promise<Apiculteur | null> {
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
    } as Apiculteur;
  }

  /**
   * Mettre à jour un apiculteur
   */
  async updateApiculteur(id: string, data: Partial<Apiculteur>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  }
}