import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirestoreService],
})
export class AuthModule {}