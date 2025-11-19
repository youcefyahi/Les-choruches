import { Module } from '@nestjs/common';
import { ActionsSaisonnieresController } from './actions-saisonnieres.controller';
import { ActionsSaisonnieresService } from './actions-saisonnieres.service';
import { FirebaseModule } from '../firebase.module';
import { FirestoreService } from 'src/firestore/base-firestore.service';

@Module({
  imports: [FirebaseModule],
  controllers: [ActionsSaisonnieresController],
  providers: [ActionsSaisonnieresService,FirestoreService],
  exports: [ActionsSaisonnieresService],
})
export class ActionsSaisonnieresModule {}