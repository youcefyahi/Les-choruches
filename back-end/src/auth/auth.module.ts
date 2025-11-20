import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirestoreModule } from '../firestore/firestore.module'; // ✅ AJOUTER

@Module({
  imports: [FirestoreModule], // ✅ AJOUTER
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}