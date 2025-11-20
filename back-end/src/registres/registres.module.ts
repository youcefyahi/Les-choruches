import { Module } from '@nestjs/common';
import { RegistresController } from './registres.controller';
import { RegistresService } from './registres.service';
import { FirestoreModule } from '../firestore/firestore.module';
import { ExportService } from './export.service';


@Module({
  imports: [FirestoreModule], // ✅ FirestoreModule
  controllers: [RegistresController],
  providers: [RegistresService,ExportService], // ✅ PAS besoin d'ajouter les services Firestore
})
export class RegistresModule {}