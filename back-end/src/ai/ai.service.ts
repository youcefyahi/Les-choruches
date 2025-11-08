// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AIService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async enhanceCompteRendu(compteRenduData: any) {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: "user",
                content: `Transforme ce compte rendu apiculture en rapport professionnel : ${JSON.stringify(compteRenduData)}`
            }],
            max_tokens: 1500,
        });

        return completion.choices[0].message.content;
    }
}