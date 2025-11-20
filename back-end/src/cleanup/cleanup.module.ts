import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { FirestoreModule } from '../firestore/firestore.module'; // ✅ IMPORTER

@Module({
  imports: [FirestoreModule], // ✅ AJOUTER
  providers: [CleanupService],
})
export class CleanupModule {}