import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('ai')
@UseGuards(AuthGuard)
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('enhance-compte-rendu')
  async enhanceCompteRendu(@Body() body: { compteRendu: any }) {
    const enhancedText = await this.aiService.enhanceCompteRendu(body.compteRendu);
    return { enhancedText };
  }
}