import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'; // ← Ajouter
import { FirestoreService } from '../firestore/firestore.service';
import { AdminGuard } from './admin.guard';


@Module({
  controllers: [AuthController,AdminGuard],
  providers: [AuthService, AuthGuard, FirestoreService], // ← Ajouter AuthGuard
  exports: [AuthService, AuthGuard,AdminGuard], // ← Exporter AuthGuard
})
export class AuthModule {}