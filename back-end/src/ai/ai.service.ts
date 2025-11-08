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
            model: "gpt-3.5-turbo", // ← CHANGÉ de gpt-4 à gpt-3.5-turbo
            messages: [{
                role: "user",
                content: `Tu es un expert en apiculture. Transforme ce compte rendu simple en rapport professionnel détaillé et structuré :

Date: ${compteRenduData.date}
Observations texte: ${compteRenduData.observations_texte || 'Aucune'}
Personnel présent: ${compteRenduData.personnel_present?.map(p => p.nom).join(', ') || 'Non spécifié'}
Photos: ${compteRenduData.photos?.length || 0}
Vidéos: ${compteRenduData.videos?.length || 0}

Génère un compte rendu professionnel et détaillé.`
            }],
            max_tokens: 1500,
        });

        return completion.choices[0].message.content;
    }
}