import { Module } from '@nestjs/common';
import { ComptesRendusController } from './compte-rendu.controller';
import { CompteRenduService } from './compte-rendu.service';
import { FirebaseModule } from '../firebase.module';
import { FirestoreService } from 'src/firestore/firestore.service';
import { LinkedInModule } from '../linkedin/linkedin.module';  
import { EmailModule } from '../email/email.module';            

@Module({
  imports: [FirebaseModule,LinkedInModule,EmailModule],
  controllers: [ComptesRendusController],
  providers: [CompteRenduService,FirestoreService],
  exports: [CompteRenduService],  // ← Exporte le service pour MurModule
})
export class ComptesRendusModule { }