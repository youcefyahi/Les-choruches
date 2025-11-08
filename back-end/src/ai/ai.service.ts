import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async enhanceCompteRendu(compteRenduData: any) {
    let observationsText = compteRenduData.observations_texte || '';

    // Si c'est un audio, le transcrire d'abord
    if (compteRenduData.observations_type === 'audio' && compteRenduData.observations_audio_url) {
      try {
        observationsText = await this.transcribeAudio(compteRenduData.observations_audio_url);
      } catch (error) {
        console.error('Erreur transcription audio:', error);
        throw new Error('Impossible de transcrire l\'audio');
      }
    }

    // Si pas de texte du tout
    if (!observationsText) {
      throw new Error('Aucune observation à enrichir');
    }

    // Enrichir avec GPT
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Tu es un expert en apiculture. Transforme ce compte rendu simple en rapport professionnel détaillé et structuré :

            Date: ${compteRenduData.date}
            Observations: ${observationsText}
            Personnel présent: ${compteRenduData.personnel_present?.map((p) => p.nom).join(', ') || 'Non spécifié'}
            Photos: ${compteRenduData.photos?.length || 0}
            Vidéos: ${compteRenduData.videos?.length || 0}

Génère un compte rendu professionnel et détaillé avec sections claires.`,
        },
      ],
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  }

  /**
   * Transcrit un audio via OpenAI Whisper
   */
  private async transcribeAudio(audioUrl: string): Promise<string> {
    // Télécharger l'audio depuis Firebase
    const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const audioBuffer = Buffer.from(response.data);

    // Créer un fichier temporaire
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const tempFilePath = path.join(tempDir, `audio_${Date.now()}.webm`);
    fs.writeFileSync(tempFilePath, audioBuffer);

    try {
      // Transcrire avec Whisper
      const transcription = await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: 'whisper-1',
        language: 'fr',
      });

      return transcription.text;
    } finally {
      // Supprimer le fichier temporaire
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  }
}