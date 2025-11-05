import { Module } from '@nestjs/common';
import { EntreprisesController } from './entreprises.controller';
import { EntreprisesService } from './entreprises.service';
import { FirebaseModule } from '../firebase.module';
import { FirestoreService } from 'src/firestore/firestore.service';

@Module({
  imports: [FirebaseModule],
  controllers: [EntreprisesController],
  providers: [EntreprisesService,FirestoreService],
})
export class EntreprisesModule {}
