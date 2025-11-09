import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkedInService {
    private readonly accessToken: string;

    constructor(private configService: ConfigService) {
        const token = this.configService.get<string>('LINKEDIN_ACCESS_TOKEN');
        if (!token) {
            throw new Error('LINKEDIN_ACCESS_TOKEN non configuré dans .env');
        }
        this.accessToken = token;
    }

    async postToLinkedIn(compteRendu: any): Promise<void> {
        try {
            // ✅ Utilise ton LinkedIn ID
            const authorUrn = 'urn:li:person:K4qU-FOmbK';

            console.log('📝 Création du post LinkedIn');

            const postText = this.generatePostText(compteRendu);

            const postData = {
                author: authorUrn,
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: postText,
                        },
                        shareMediaCategory: 'NONE',
                    },
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
                },
            };

            const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                    'X-Restli-Protocol-Version': '2.0.0',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const error = await response.text();
                console.error('Erreur publication LinkedIn:', error);
                throw new Error('Erreur lors de la publication sur LinkedIn');
            }

            console.log('✅ Post LinkedIn publié avec succès !');
        } catch (error) {
            console.error('❌ Erreur LinkedIn:', error);
            throw error;
        }
    }

    private generatePostText(compteRendu: any): string {
        // ✅ Affiche jusqu'à 1000 caractères au lieu de 200
        const maxLength = 1000;
        const observations = compteRendu.observations_texte || '';
        const truncatedObs = observations.length > maxLength
            ? observations.substring(0, maxLength) + '...'
            : observations;

        return `🐝 Nouveau compte rendu de visite apicole validé !

📅 Date : ${compteRendu.date ? new Date(compteRendu.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}

📝 ${truncatedObs}

#Apiculture #Abeilles #LesÉchoruches`;
    }
}