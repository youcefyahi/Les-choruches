import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  providers: [CleanupService, FirestoreService],
  exports: [CleanupService]
})
export class CleanupModule {}