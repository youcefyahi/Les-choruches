import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CompteRenduFirestoreService } from '../firestore/compte-rendu-firestore.service'; // ✅ CHANGÉ

@Injectable()
export class CleanupService {
  constructor(
    private compteRenduFirestoreService: CompteRenduFirestoreService // ✅ CHANGÉ
  ) {}

  // Tâche qui s'exécute tous les jours à 2h du matin
  @Cron('0 2 * * *') 
  async handleCleanup() {
    console.log('🧹 Nettoyage automatique des données temporaires...');
    await this.deleteOldTemporaryData();
  }

  async deleteOldTemporaryData() {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    
    console.log('🗑️ Suppression des données temporaires > 2 jours:', twoDaysAgo);
    
    // ✅ Appel via le service spécialisé
    await this.compteRenduFirestoreService.deleteTemporaryComptesRendus(twoDaysAgo); // ✅ CHANGÉ
  }
}