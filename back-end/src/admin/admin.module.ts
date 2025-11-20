import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { FirestoreModule } from '../firestore/firestore.module'; // ✅ CHANGÉ

@Module({
  imports: [FirestoreModule], // ✅ FirestoreModule au lieu de FirebaseModule
  controllers: [AdminController],
  providers: [AdminService], // ✅ PAS BESOIN de BaseFirestoreService
})
export class AdminModule {}