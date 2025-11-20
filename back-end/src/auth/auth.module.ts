import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'; // ← Ajouter
import { FirestoreModule } from '../firestore/firestore.module';
import { AdminGuard } from './admin.guard';


@Module({
  controllers: [AuthController,FirestoreModule],
  providers: [AuthService, AuthGuard,AdminGuard], // ← Ajouter AuthGuard
  exports: [AuthService, AuthGuard,AdminGuard], // ← Exporter AuthGuard
})
export class AuthModule {}