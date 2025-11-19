import { Injectable } from '@nestjs/common';
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { BaseFirestoreService } from './base-firestore.service';
import { RendezVous } from '../Models/RendezVous';

@Injectable()
export class RendezVousFirestoreService extends BaseFirestoreService {
  private readonly collectionName = 'rendez_vous';

  /**
   * Créer un nouveau rendez-vous
   */
  async createRendezVous(rdv: Omit<RendezVous, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(this.firestore, this.collectionName), {
      ...rdv,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  /**
   * Récupérer les rendez-vous d'un apiculteur
   */
  async getRendezVousByApiculteur(apiculteurId: string): Promise<RendezVous[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('apiculteurId', '==', apiculteurId)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as RendezVous));
  }

  /**
   * Récupérer les rendez-vous d'une entreprise
   */
  async getRendezVousByEntreprise(entrepriseId: string): Promise<RendezVous[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('entrepriseId', '==', entrepriseId)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as RendezVous));
  }

  /**
   * Mettre à jour un rendez-vous
   */
  async updateRendezVous(id: string, data: Partial<RendezVous>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  }
}