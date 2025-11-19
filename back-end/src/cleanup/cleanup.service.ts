import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FirestoreService } from '../firestore/base-firestore.service';

@Injectable()
export class CleanupService {
  constructor(private firestoreService: FirestoreService) {}

  // Tâche qui s'exécute tous les jours à 2h du matin
  @Cron('0 2 * * *') 
  async handleCleanup() {
    console.log('🧹 Nettoyage automatique des données temporaires...');
    await this.deleteOldTemporaryData();
  }

  async deleteOldTemporaryData() {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    
    console.log('🗑️ Suppression des données temporaires > 2 jours:', twoDaysAgo);
    
    // ✅ SEULEMENT les comptes rendus temporaires > 2 jours
    await this.firestoreService.deleteTemporaryComptesRendus(twoDaysAgo);
  }
}