import { Module } from '@nestjs/common';
import { ComptesRendusController } from './compte-rendu.controller';
import { CompteRenduService } from './compte-rendu.service';
import { FirebaseModule } from '../firebase.module';
import { FirestoreService } from 'src/firestore/firestore.service';

@Module({
  imports: [FirebaseModule],
  controllers: [ComptesRendusController],
  providers: [CompteRenduService,FirestoreService],
  exports: [CompteRenduService],  // ← Exporte le service pour MurModule
})
export class ComptesRendusModule { }