import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { RendezVous } from '../Models/RendezVous';

@Injectable()
export class RendezVousService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async createRendezVous(data: Omit<RendezVous, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const rdvId = await this.firestoreService.createRendezVous(data);
      
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
      const rendezVous = await this.firestoreService.getRendezVousByApiculteur(apiculteurId);
      
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
      const rendezVous = await this.firestoreService.getRendezVousByEntreprise(entrepriseId);
      
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
      await this.firestoreService.updateRendezVous(id, data);
      
      return {
        success: true,
        message: 'Rendez-vous mis à jour avec succès',
      };
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du rendez-vous: ${error.message}`);
    }
  }
}