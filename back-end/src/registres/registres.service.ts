import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { RegistreElevage } from '../Models/RegistreElevage';

@Injectable()
export class RegistresService {
  constructor(private firestoreService: FirestoreService) { }

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

  async addObservation(registreId: string, observationData: { date: Date; content: string }) {
    try {
      const observation = {
        id: Date.now().toString(),
        ...observationData
      };

      await this.firestoreService.addObservationToRegistre(registreId, observation);

      return observation;
    } catch (error) {
      throw new Error(`Error adding observation: ${error.message}`);
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

  async updateRegistre(id: string, data: Partial<RegistreElevage>) {
    return await this.firestoreService.updateRegistre(id, data);
  }

  // // DEPLACEMENNT // // 

  async addDeplacement(registreId: string, deplacementData: { date: Date; nouvelleAdresse: string }) {
    try {
      const deplacement = {
        id: Date.now().toString(),
        ...deplacementData
      };

      await this.firestoreService.addDeplacementToRegistre(registreId, deplacement);

      return deplacement;
    } catch (error) {
      throw new Error(`Error adding deplacement: ${error.message}`);
    }
  }

  // // DEPLACEMENNT // // 

  // // RECOLTE // // 

  async addRecolte(registreId: string, recolteData: { date: Date; volume: number }) {
    try {
      const recolte = {
        id: Date.now().toString(),
        ...recolteData
      };

      await this.firestoreService.addRecolteToRegistre(registreId, recolte);

      return recolte;
    } catch (error) {
      throw new Error(`Error adding recolte: ${error.message}`);
    }
  }

  // // TRAITEMENT //
  async addTraitementVarroa(registreId: string, traitementData: { date: Date; produit: string }) {
    try {
      const traitement = {
        id: Date.now().toString(),
        ...traitementData
      };

      await this.firestoreService.addTraitementVarroaToRegistre(registreId, traitement);

      return traitement;
    } catch (error) {
      throw new Error(`Error adding traitement varroa: ${error.message}`);
    }
  }

  // // NOURISSEMENT // // 

  async addNourrissement(registreId: string, nourrissementData: { date: Date; quantite: number; produit: string }) {
    try {
      const nourrissement = {
        id: Date.now().toString(),
        ...nourrissementData
      };

      await this.firestoreService.addNourrissementToRegistre(registreId, nourrissement);

      return nourrissement;
    } catch (error) {
      throw new Error(`Error adding nourrissement: ${error.message}`);
    }
  }

  // // MALADIE ET TRAITEMENT // // 
  async addMaladieTraitement(registreId: string, maladieTraitementData: { date: Date; maladie: string; traitement?: string }) {
    try {
      const maladieTraitement = {
        id: Date.now().toString(),
        ...maladieTraitementData
      };

      await this.firestoreService.addMaladieTraitementToRegistre(registreId, maladieTraitement);

      return maladieTraitement;
    } catch (error) {
      throw new Error(`Error adding maladie traitement: ${error.message}`);
    }
  }
}