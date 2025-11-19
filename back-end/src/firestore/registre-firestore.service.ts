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
import { RegistreElevage } from '../Models/RegistreElevage';

@Injectable()
export class RegistreFirestoreService extends BaseFirestoreService {
  private readonly collectionName = 'registres';

  /**
   * Créer un nouveau registre d'élevage
   */
  async createRegistre(registre: Omit<RegistreElevage, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(this.firestore, this.collectionName), {
      ...registre,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  /**
   * Récupérer un registre par ID
   */
  async getRegistre(id: string): Promise<RegistreElevage | null> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as RegistreElevage;
  }

  /**
   * Récupérer tous les registres d'un apiculteur
   */
  async getRegistresByApiculteur(apiculteurId: string): Promise<RegistreElevage[]> {
    const q = query(
      collection(this.firestore, this.collectionName), 
      where('apiculteurId', '==', apiculteurId)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as RegistreElevage));
  }

  /**
   * Mettre à jour un registre
   */
  async updateRegistre(id: string, data: Partial<RegistreElevage>): Promise<RegistreElevage> {
    const docRef = doc(this.firestore, this.collectionName, id);

    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });

    // Récupérer le document mis à jour
    const updatedDoc = await getDoc(docRef);

    if (!updatedDoc.exists()) {
      throw new Error('Registre non trouvé');
    }

    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    } as RegistreElevage;
  }

  // ============================================
  // MÉTHODES POUR AJOUTER DES ÉLÉMENTS AU REGISTRE
  // ============================================

  /**
   * Méthode générique privée pour ajouter un élément à un tableau du registre
   * ✅ ÉVITE LA DUPLICATION DE CODE
   */
  private async addItemToRegistreArray(
    registreId: string, 
    arrayName: string, 
    item: any
  ): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, registreId);
    const registre = await getDoc(docRef);

    if (!registre.exists()) {
      throw new Error('Registre non trouvé');
    }

    const data = registre.data();
    const array = data[arrayName] || [];
    array.push(item);

    await updateDoc(docRef, {
      [arrayName]: array,
      updatedAt: new Date()
    });
  }

  /**
   * Ajouter une observation au registre
   */
  async addObservationToRegistre(registreId: string, observation: any): Promise<void> {
    await this.addItemToRegistreArray(registreId, 'observations', observation);
  }

  /**
   * Ajouter un déplacement au registre
   */
  async addDeplacementToRegistre(registreId: string, deplacement: any): Promise<void> {
    await this.addItemToRegistreArray(registreId, 'deplacements', deplacement);
  }

  /**
   * Ajouter une récolte au registre
   */
  async addRecolteToRegistre(registreId: string, recolte: any): Promise<void> {
    await this.addItemToRegistreArray(registreId, 'recoltes', recolte);
  }

  /**
   * Ajouter un traitement varroa au registre
   */
  async addTraitementVarroaToRegistre(registreId: string, traitement: any): Promise<void> {
    await this.addItemToRegistreArray(registreId, 'traitementsVarroa', traitement);
  }

  /**
   * Ajouter un nourrissement au registre
   */
  async addNourrissementToRegistre(registreId: string, nourrissement: any): Promise<void> {
    await this.addItemToRegistreArray(registreId, 'nourrissements', nourrissement);
  }

  /**
   * Ajouter une maladie/traitement au registre
   */
  async addMaladieTraitementToRegistre(registreId: string, maladieTraitement: any): Promise<void> {
    await this.addItemToRegistreArray(registreId, 'maladiesTraitements', maladieTraitement);
  }
}