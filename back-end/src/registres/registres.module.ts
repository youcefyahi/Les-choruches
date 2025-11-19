import { Module } from '@nestjs/common';
import { RegistresController } from './registres.controller';
import { RegistresService } from './registres.service';
import { FirestoreService } from '../firestore/base-firestore.service';
import { ExportService } from './export.service';

@Module({
  controllers: [RegistresController],
  providers: [RegistresService, FirestoreService,ExportService],
})
export class RegistresModule {}