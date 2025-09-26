import { Module } from '@nestjs/common';
import { RegistresController } from './registres.controller';
import { RegistresService } from './registres.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [RegistresController],
  providers: [RegistresService, FirestoreService],
})
export class RegistresModule {}