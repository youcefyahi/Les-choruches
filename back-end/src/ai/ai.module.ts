// src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { AIController } from './ai.controller';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  providers: [AIService, FirestoreService],
  controllers: [AIController],
  exports: [AIService]
})
export class AIModule {}