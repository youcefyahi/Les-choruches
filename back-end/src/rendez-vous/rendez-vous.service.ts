import { Injectable } from '@nestjs/common';
import { RendezVousFirestoreService } from '../firestore/rendez-vous-firestore.service'; // ✅ CHANGÉ
import { RendezVous } from '../Models/RendezVous';

@Injectable()
export class RendezVousService {
  constructor(
    private readonly rendezVousFirestoreService: RendezVousFirestoreService // ✅ CHANGÉ
  ) {}

  async createRendezVous(data: Omit<RendezVous, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const rdvId = await this.rendezVousFirestoreService.createRendezVous(data); // ✅ CHANGÉ
      
      return {
        success: true,
        message: 'Rendez-vous créé avec succès',
        rdvId,
      };
    } catch (error) {
      throw new Error(`Erreur lors de la création du rendez-vous: ${error.message}`);
    }
  }

  async getRendezVousByApiculteur(apiculteurId: string) {
    try {
      const rendezVous = await this.rendezVousFirestoreService.getRendezVousByApiculteur(apiculteurId); // ✅ CHANGÉ
      
      return {
        success: true,
        rendezVous,
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des rendez-vous: ${error.message}`);
    }
  }

  async getRendezVousByEntreprise(entrepriseId: string) {
    try {
      const rendezVous = await this.rendezVousFirestoreService.getRendezVousByEntreprise(entrepriseId); // ✅ CHANGÉ
      
      return {
        success: true,
        rendezVous,
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des rendez-vous: ${error.message}`);
    }
  }

  async updateRendezVous(id: string, data: Partial<RendezVous>) {
    try {
      await this.rendezVousFirestoreService.updateRendezVous(id, data); // ✅ CHANGÉ
      
      return {
        success: true,
        message: 'Rendez-vous mis à jour avec succès',
      };
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du rendez-vous: ${error.message}`);
    }
  }
}