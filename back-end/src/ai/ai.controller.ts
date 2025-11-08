// src/ai/ai.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('ai')
@UseGuards(AuthGuard)
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('enhance-compte-rendu')
  async enhanceCompteRendu(@Body() body: { compteRenduId: string }) {
    return await this.aiService.enhanceCompteRendu(body.compteRenduId);
  }
}