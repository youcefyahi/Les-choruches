import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'; // ← Ajouter
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, FirestoreService], // ← Ajouter AuthGuard
  exports: [AuthService, AuthGuard], // ← Exporter AuthGuard
})
export class AuthModule {}