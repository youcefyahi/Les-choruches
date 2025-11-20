import { Module } from '@nestjs/common';
import { RendezVousController } from './rendez-vous.controller';
import { RendezVousService } from './rendez-vous.service';
import { FirestoreModule } from '../firestore/firestore.module'; // ✅ CHANGÉ

@Module({
  imports: [FirestoreModule], // ✅ FirestoreModule au lieu de FirebaseModule
  controllers: [RendezVousController],
  providers: [RendezVousService], // ✅ PAS BESOIN de FirestoreService
})
export class RendezVousModule {}