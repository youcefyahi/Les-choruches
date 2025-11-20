import { Module } from '@nestjs/common';
import { RegistresController } from './registres.controller';
import { RegistresService } from './registres.service';
import { FirestoreModule } from '../firestore/firestore.module'; // ✅

@Module({
  imports: [FirestoreModule], // ✅ FirestoreModule
  controllers: [RegistresController],
  providers: [RegistresService], // ✅ PAS besoin d'ajouter les services Firestore
})
export class RegistresModule {}