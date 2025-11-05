import { Module } from '@nestjs/common';
import { RendezVousController } from './rendez-vous.controller';
import { RendezVousService } from './rendez-vous.service';
import { FirebaseModule } from '../firebase.module';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  imports: [FirebaseModule],
  controllers: [RendezVousController],
  providers: [RendezVousService, FirestoreService],
})
export class RendezVousModule {}