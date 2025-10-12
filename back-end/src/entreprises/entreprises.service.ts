import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { Entreprise } from '../Models/Entreprise';

@Injectable()
export class EntreprisesService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async createEntreprise(data: Omit<Entreprise, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const entrepriseId = await this.firestoreService.createEntreprise(data);
      return {
        success: true,
        message: 'Entreprise créée avec succès',
        entrepriseId,
      };
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'entreprise: ${error.message}`);
    }
  }

  async getAllEntreprises() {
    try {
      const entreprises = await this.firestoreService.getAllEntreprises();
      return {
        success: true,
        entreprises,
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entreprises: ${error.message}`);
    }
  }

  async getEntrepriseById(id: string) {
    try {
      const entreprise = await this.firestoreService.getEntrepriseById(id);
      
      if (!entreprise) {
        throw new Error('Entreprise introuvable');
      }

      return {
        success: true,
        entreprise,
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'entreprise: ${error.message}`);
    }
  }

  async updateEntreprise(id: string, data: Partial<Entreprise>) {
    try {
      await this.firestoreService.updateEntreprise(id, data);
      return {
        success: true,
        message: 'Entreprise mise à jour avec succès',
      };
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'entreprise: ${error.message}`);
    }
  }

  async deleteEntreprise(id: string) {
    try {
      await this.firestoreService.deleteEntreprise(id);
      return {
        success: true,
        message: 'Entreprise supprimée avec succès',
      };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'entreprise: ${error.message}`);
    }
  }
}