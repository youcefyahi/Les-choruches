import { Injectable } from '@nestjs/common';
import { RegistreFirestoreService } from '../firestore/registre-firestore.service';
import { ApiculteurFirestoreService } from '../firestore/apiculteur-firestore.service'; // ✅ AJOUTÉ
import { RegistreElevage } from '../Models/RegistreElevage';

@Injectable()
export class RegistresService {
  constructor(
    private registreFirestoreService: RegistreFirestoreService, // ✅ RENOMMÉ
    private apiculteurFirestoreService: ApiculteurFirestoreService // ✅ AJOUTÉ
  ) { }

  async createRegistre(registreData: Omit<RegistreElevage, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      // Vérifier que l'apiculteur existe
      const apiculteur = await this.apiculteurFirestoreService.getApiculteur(registreData.apiculteurId); // ✅ CHANGÉ
      if (!apiculteur) {
        throw new Error('Apiculteur introuvable');
      }

      // Créer le registre dans Firestore
      const registreId = await this.registreFirestoreService.createRegistre(registreData); // ✅ CHANGÉ

      // Récupérer le registre créé pour le retourner
      const nouveauRegistre = await this.registreFirestoreService.getRegistre(registreId); // ✅ CHANGÉ

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

      await this.registreFirestoreService.addObservationToRegistre(registreId, observation); // ✅ CHANGÉ

      return observation;
    } catch (error) {
      throw new Error(`Error adding observation: ${error.message}`);
    }
  }

  async getRegistresByApiculteur(apiculteurId: string) {
    try {
      // Vérifier que l'apiculteur existe
      const apiculteur = await this.apiculteurFirestoreService.getApiculteur(apiculteurId); // ✅ CHANGÉ
      if (!apiculteur) {
        throw new Error('Apiculteur introuvable');
      }

      // Récupérer tous les registres de cet apiculteur
      const registres = await this.registreFirestoreService.getRegistresByApiculteur(apiculteurId); // ✅ CHANGÉ

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
      const registre = await this.registreFirestoreService.getRegistre(registreId); // ✅ CHANGÉ

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
    return await this.registreFirestoreService.updateRegistre(id, data); // ✅ CHANGÉ
  }

  // // DEPLACEMENT // // 

  async addDeplacement(registreId: string, deplacementData: { date: Date; nouvelleAdresse: string }) {
    try {
      const deplacement = {
        id: Date.now().toString(),
        ...deplacementData
      };

      await this.registreFirestoreService.addDeplacementToRegistre(registreId, deplacement); // ✅ CHANGÉ

      return deplacement;
    } catch (error) {
      throw new Error(`Error adding deplacement: ${error.message}`);
    }
  }

  // // RECOLTE // // 

  async addRecolte(registreId: string, recolteData: { date: Date; volume: number }) {
    try {
      const recolte = {
        id: Date.now().toString(),
        ...recolteData
      };

      await this.registreFirestoreService.addRecolteToRegistre(registreId, recolte); // ✅ CHANGÉ

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

      await this.registreFirestoreService.addTraitementVarroaToRegistre(registreId, traitement); // ✅ CHANGÉ

      return traitement;
    } catch (error) {
      throw new Error(`Error adding traitement varroa: ${error.message}`);
    }
  }

  // // NOURRISSEMENT // // 

  async addNourrissement(registreId: string, nourrissementData: { date: Date; quantite: number; produit: string }) {
    try {
      const nourrissement = {
        id: Date.now().toString(),
        ...nourrissementData
      };

      await this.registreFirestoreService.addNourrissementToRegistre(registreId, nourrissement); // ✅ CHANGÉ

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

      await this.registreFirestoreService.addMaladieTraitementToRegistre(registreId, maladieTraitement); // ✅ CHANGÉ

      return maladieTraitement;
    } catch (error) {
      throw new Error(`Error adding maladie traitement: ${error.message}`);
    }
  }
}