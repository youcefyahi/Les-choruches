import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { FirebaseModule } from '../firebase.module';
import { FirestoreService } from 'src/firestore/firestore.service';

@Module({
  imports: [FirebaseModule],  // ← Seulement FirebaseModule
  controllers: [AdminController],
  providers: [AdminService,FirestoreService],
})
export class AdminModule {}