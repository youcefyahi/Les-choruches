import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { FirebaseModule } from '../firebase.module';
import { BaseFirestoreService } from 'src/firestore/base-firestore.service';

@Module({
  imports: [FirebaseModule],  // ← Seulement FirebaseModule
  controllers: [AdminController],
  providers: [AdminService,BaseFirestoreService],
})
export class AdminModule {}