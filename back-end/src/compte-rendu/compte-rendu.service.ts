import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/base-firestore.service';
import { CompteRendu } from '../Models/CompteRendu';
import { LinkedInService } from '../linkedin/linkedin.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class CompteRenduService {
  constructor(
    private firestoreService: FirestoreService,
    private linkedInService: LinkedInService,
    private emailService: EmailService,
  ) {}

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

  async soumettreValidation(id: string, apiculteurId: string): Promise<void> {
    const compteRendu = await this.firestoreService.getCompteRenduById(id);

    if (!compteRendu) {
      throw new Error('Compte rendu introuvable');
    }

    if (compteRendu.apiculteur_id !== apiculteurId) {
      throw new Error('Non autorisé');
    }

    if (compteRendu.statut !== 'brouillon') {
      throw new Error('Ce compte rendu ne peut plus être soumis');
    }

    await this.firestoreService.updateCompteRendu(id, {
      statut: 'en_attente_validation',
    });
  }

  async getComptesRendusEnAttente(): Promise<CompteRendu[]> {
    return this.firestoreService.getComptesRendusByStatut('en_attente_validation');
  }

  async validerCompteRendu(id: string, adminId: string): Promise<void> {
    const compteRendu = await this.firestoreService.getCompteRenduById(id);

    if (!compteRendu) {
      throw new Error('Compte rendu introuvable');
    }

    if (compteRendu.statut !== 'en_attente_validation') {
      throw new Error("Ce compte rendu n'est pas en attente de validation");
    }

    // 1. Mettre à jour le statut dans Firestore
    await this.firestoreService.updateCompteRendu(id, {
      statut: 'validé',
      date_validation: new Date(),
      validé_par: adminId,
    });

    console.log('📢 Compte rendu validé, publication LinkedIn + Email...');

    // 2. Publier sur LinkedIn
    try {
      await this.linkedInService.postToLinkedIn(compteRendu);
    } catch (error) {
      console.error('❌ Erreur publication LinkedIn:', error);
      // On continue même si LinkedIn échoue
    }

    // 3. Envoyer l'email
    try {
      await this.emailService.sendValidationEmail(compteRendu);
    } catch (error) {
      console.error('❌ Erreur envoi email:', error);
      // On continue même si l'email échoue
    }
  }

  async rejeterCompteRendu(id: string, adminId: string, motif: string): Promise<void> {
    const compteRendu = await this.firestoreService.getCompteRenduById(id);

    if (!compteRendu) {
      throw new Error('Compte rendu introuvable');
    }

    if (compteRendu.statut !== 'en_attente_validation') {
      throw new Error("Ce compte rendu n'est pas en attente de validation");
    }

    await this.firestoreService.updateCompteRendu(id, {
      statut: 'rejeté',
      date_validation: new Date(),
      validé_par: adminId,
      motif_rejet: motif,
    });
  }

  async getComptesRendusValides(): Promise<CompteRendu[]> {
    return this.firestoreService.getComptesRendusByStatut('validé');
  }
}