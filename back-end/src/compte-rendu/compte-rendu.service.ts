import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { FirestoreService } from '../firestore/firestore.service';
import { CompteRendu } from '../Models/CompteRendu';

@Injectable()
export class CompteRenduService {
  constructor(
    private firestoreService: FirestoreService,
    @Inject('FIRESTORE') private firestore: Firestore,
  ) { }

  async create(data: Omit<CompteRendu, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const now = new Date();
    const compteRendu: Omit<CompteRendu, 'id'> = {
      ...data,
      created_at: now,
      updated_at: now,
    };

    return this.firestoreService.createCompteRendu(compteRendu);
  }

  async getByApiculteur(apiculteurId: string): Promise<CompteRendu[]> {
    return this.firestoreService.getComptesRendusByApiculteur(apiculteurId);
  }

  async getById(id: string): Promise<CompteRendu | null> {
    return this.firestoreService.getCompteRenduById(id);
  }

  async update(id: string, data: Partial<CompteRendu>): Promise<void> {
    const updateData = {
      ...data,
      updated_at: new Date(),
    };

    return this.firestoreService.updateCompteRendu(id, updateData);
  }

  async delete(id: string): Promise<void> {
    return this.firestoreService.deleteCompteRendu(id);
  }

  /**
   * Soumettre un compte rendu pour validation (apiculteur)
   */
  async soumettreValidation(id: string, apiculteurId: string): Promise<void> {
    const compteRenduRef = this.firestore.collection('comptes-rendus').doc(id);
    const doc = await compteRenduRef.get();

    if (!doc.exists) {
      throw new Error('Compte rendu introuvable');
    }

    const data = doc.data();

    if (!data) {
      throw new Error('Données du compte rendu introuvables');
    }

    // Vérifier que c'est bien l'auteur
    if (data.apiculteur_id !== apiculteurId) {
      throw new Error('Non autorisé');
    }

    // Vérifier que ce n'est pas déjà soumis/validé
    if (data.statut !== 'brouillon') {
      throw new Error('Ce compte rendu ne peut plus être soumis');
    }

    await compteRenduRef.update({
      statut: 'en_attente_validation',
      updated_at: new Date(),
    });
  }

  /**
   * Lister les comptes rendus en attente de validation (admin)
   */
  async getComptesRendusEnAttente(): Promise<CompteRendu[]> {
    const snapshot = await this.firestore
      .collection('comptes-rendus')
      .where('statut', '==', 'en_attente_validation')
      .orderBy('created_at', 'desc')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CompteRendu[];
  }

  /**
   * Valider un compte rendu (admin)
   */
  async validerCompteRendu(id: string, adminId: string): Promise<void> {
    const compteRenduRef = this.firestore.collection('comptes-rendus').doc(id);
    const doc = await compteRenduRef.get();

    if (!doc.exists) {
      throw new Error('Compte rendu introuvable');
    }

    const data = doc.data();

    if (!data) {
      throw new Error('Données du compte rendu introuvables');
    }

    if (data.statut !== 'en_attente_validation') {
      throw new Error("Ce compte rendu n'est pas en attente de validation");
    }

    await compteRenduRef.update({
      statut: 'validé',
      date_validation: new Date(),
      validé_par: adminId,
      updated_at: new Date(),
    });
  }

  /**
   * Rejeter un compte rendu (admin)
   */
  async rejeterCompteRendu(id: string, adminId: string, motif: string): Promise<void> {
    const compteRenduRef = this.firestore.collection('comptes-rendus').doc(id);
    const doc = await compteRenduRef.get();

    if (!doc.exists) {
      throw new Error('Compte rendu introuvable');
    }

    const data = doc.data();

    if (!data) {
      throw new Error('Données du compte rendu introuvables');
    }

    if (data.statut !== 'en_attente_validation') {
      throw new Error("Ce compte rendu n'est pas en attente de validation");
    }

    await compteRenduRef.update({
      statut: 'rejeté',
      date_validation: new Date(),
      validé_par: adminId,
      motif_rejet: motif,
      updated_at: new Date(),
    });
  }

  /**
   * Récupérer les comptes rendus validés pour le mur (public)
   */
  async getComptesRendusValides(): Promise<CompteRendu[]> {
    const snapshot = await this.firestore
      .collection('comptes-rendus')
      .where('statut', '==', 'validé')
      .orderBy('date_validation', 'desc')
      .limit(50)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CompteRendu[];
  }
}