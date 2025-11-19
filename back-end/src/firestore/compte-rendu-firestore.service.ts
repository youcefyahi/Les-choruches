import { Injectable } from '@nestjs/common';
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { BaseFirestoreService } from './base-firestore.service';
import { CompteRendu } from '../Models/CompteRendu';

@Injectable()
export class CompteRenduFirestoreService extends BaseFirestoreService {
  private readonly collectionName = 'comptes_rendus';

  /**
   * Créer un nouveau compte rendu
   */
  async createCompteRendu(compteRendu: Omit<CompteRendu, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(this.firestore, this.collectionName), compteRendu);
    return docRef.id;
  }

  /**
   * Récupérer un compte rendu par ID
   */
  async getCompteRenduById(id: string): Promise<CompteRendu | null> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as CompteRendu;
  }

  /**
   * Récupérer tous les comptes rendus d'un apiculteur
   */
  async getComptesRendusByApiculteur(apiculteurId: string): Promise<CompteRendu[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('apiculteur_id', '==', apiculteurId)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as CompteRendu));
  }

  /**
   * Récupérer les comptes rendus par statut (triés par date décroissante)
   */
  async getComptesRendusByStatut(statut: string): Promise<CompteRendu[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('statut', '==', statut),
      orderBy('created_at', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CompteRendu));
  }

  /**
   * Mettre à jour un compte rendu
   */
  async updateCompteRendu(id: string, data: Partial<CompteRendu>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, data);
  }

  /**
   * Supprimer un compte rendu
   */
  async deleteCompteRendu(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }

  /**
   * Supprimer les comptes rendus temporaires expirés
   * ✅ Utilisé par le CleanupService pour nettoyer automatiquement
   */
  async deleteTemporaryComptesRendus(twoDaysAgo: Date): Promise<void> {
    try {
      console.log('🔍 Recherche des comptes rendus temporaires à supprimer...');

      const q = query(
        collection(this.firestore, this.collectionName),
        where('is_temporary', '==', true),
        where('created_at', '<', twoDaysAgo)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('✅ Aucun compte rendu temporaire à supprimer');
        return;
      }

      console.log(`🗑️ ${querySnapshot.size} comptes rendus temporaires à supprimer`);

      // Supprimer tous les comptes rendus expirés
      for (const docSnap of querySnapshot.docs) {
        await deleteDoc(docSnap.ref);
        console.log(`✅ Supprimé compte rendu + photos: ${docSnap.id}`);
      }

      console.log('✅ Comptes rendus et photos temporaires supprimés');

    } catch (error) {
      console.error('❌ Erreur lors de la suppression des comptes rendus temporaires:', error);
      throw error;
    }
  }
}