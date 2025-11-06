import { Module } from '@nestjs/common';
import { CompteRenduController } from './compte-rendu.controller';
import { CompteRenduService } from './compte-rendu.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [CompteRenduController],
  providers: [CompteRenduService, FirestoreService],
  exports: [CompteRenduService],
})
export class CompteRenduModule {}