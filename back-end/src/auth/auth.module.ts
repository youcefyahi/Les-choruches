import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'; // ← Ajouter
import { FirestoreService } from '../firestore/base-firestore.service';
import { AdminGuard } from './admin.guard';


@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, FirestoreService,AdminGuard], // ← Ajouter AuthGuard
  exports: [AuthService, AuthGuard,AdminGuard], // ← Exporter AuthGuard
})
export class AuthModule {}