import { Injectable } from '@nestjs/common';
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { BaseFirestoreService } from './base-firestore.service';
import { Entreprise } from '../Models/Entreprise';

@Injectable()
export class EntrepriseFirestoreService extends BaseFirestoreService {
  private readonly collectionName = 'entreprises';

  /**
   * Créer une nouvelle entreprise
   */
  async createEntreprise(entreprise: Omit<Entreprise, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(this.firestore, this.collectionName), {
      ...entreprise,
      employes: entreprise.employes || [],
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  /**
   * Récupérer toutes les entreprises
   */
  async getAllEntreprises(): Promise<Entreprise[]> {
    const querySnapshot = await getDocs(collection(this.firestore, this.collectionName));
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Entreprise));
  }

  /**
   * Récupérer une entreprise par ID
   */
  async getEntrepriseById(id: string): Promise<Entreprise | null> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Entreprise;
  }

  /**
   * Mettre à jour une entreprise
   */
  async updateEntreprise(id: string, data: Partial<Entreprise>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  }

  /**
   * Supprimer une entreprise
   */
  async deleteEntreprise(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }
}