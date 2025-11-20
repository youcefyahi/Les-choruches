import { Module } from '@nestjs/common';
import { ActionsSaisonnieresController } from './actions-saisonnieres.controller';
import { ActionsSaisonnieresService } from './actions-saisonnieres.service';


@Module({
  imports: [], // ✅ Fournit déjà 'FIRESTORE'
  controllers: [ActionsSaisonnieresController],
  providers: [ActionsSaisonnieresService], // ✅ RETIRÉ FirestoreService
  exports: [ActionsSaisonnieresService],
})
export class ActionsSaisonnieresModule {}