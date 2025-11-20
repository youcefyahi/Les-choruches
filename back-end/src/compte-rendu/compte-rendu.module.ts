import { Module } from '@nestjs/common';
import { ComptesRendusController } from './compte-rendu.controller';
import { CompteRenduService } from './compte-rendu.service';
import { FirestoreModule } from '../firestore/firestore.module'; // ✅ CHANGÉ
import { LinkedInModule } from '../linkedin/linkedin.module';  
import { EmailModule } from '../email/email.module';            

@Module({
  imports: [FirestoreModule, LinkedInModule, EmailModule], // ✅ FirestoreModule au lieu de FirebaseModule
  controllers: [ComptesRendusController],
  providers: [CompteRenduService], // ✅ PAS BESOIN de CompteRenduFirestoreService ici
  exports: [CompteRenduService],
})
export class ComptesRendusModule { }