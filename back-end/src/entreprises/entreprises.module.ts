import { Module } from '@nestjs/common';
import { EntreprisesController } from './entreprises.controller';
import { EntreprisesService } from './entreprises.service';
import { EntrepriseFirestoreService } from 'src/firestore/entreprise-firestore.service';
import { FirestoreModule } from 'src/firestore/firestore.module';

@Module({
  imports: [FirestoreModule],
  controllers: [EntreprisesController],
  providers: [EntreprisesService,EntrepriseFirestoreService],
})
export class EntreprisesModule {}
