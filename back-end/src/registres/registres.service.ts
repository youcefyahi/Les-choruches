import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { RegistreElevage } from '../Models/RegistreElevage';

@Injectable()
export class RegistresService {
  constructor(private firestoreService: FirestoreService) {}

  async createRegistre(registreData: Omit<RegistreElevage, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      // Vérifier que l'apiculteur existe
      const apiculteur = await this.firestoreService.getApiculteur(registreData.apiculteurId);
      if (!apiculteur) {
        throw new Error('Apiculteur introuvable');
      }

      // Créer le registre dans Firestore
      const registreId = await this.firestoreService.createRegistre(registreData);

      // Récupérer le registre créé pour le retourner
      const nouveauRegistre = await this.firestoreService.getRegistre(registreId);

      return {
        success: true,
        message: 'Registre d\'élevage créé avec succès',
        registre: nouveauRegistre
      };

    } catch (error) {
      throw new Error(`Erreur lors de la création du registre: ${error.message}`);
    }
  }

  async getRegistresByApiculteur(apiculteurId: string) {
    try {
      // Vérifier que l'apiculteur existe
      const apiculteur = await this.firestoreService.getApiculteur(apiculteurId);
      if (!apiculteur) {
        throw new Error('Apiculteur introuvable');
      }

      // Récupérer tous les registres de cet apiculteur
      const registres = await this.firestoreService.getRegistresByApiculteur(apiculteurId);

      return {
        success: true,
        registres: registres
      };

    } catch (error) {
      throw new Error(`Erreur lors de la récupération des registres: ${error.message}`);
    }
  }

  async getRegistre(registreId: string) {
    try {
      const registre = await this.firestoreService.getRegistre(registreId);
      
      if (!registre) {
        throw new Error('Registre introuvable');
      }

      return {
        success: true,
        registre: registre
      };

    } catch (error) {
      throw new Error(`Erreur lors de la récupération du registre: ${error.message}`);
    }
  }
}