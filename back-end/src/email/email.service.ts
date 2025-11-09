import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private adminEmail: string;

    constructor(private configService: ConfigService) {
        const email = this.configService.get<string>('ADMIN_EMAIL');
        if (!email) {
            throw new Error('ADMIN_EMAIL non configuré dans .env');
        }
        this.adminEmail = email;

        const gmailPassword = this.configService.get<string>('GMAIL_APP_PASSWORD');
        if (!gmailPassword) {
            throw new Error('GMAIL_APP_PASSWORD non configuré dans .env');
        }

        // Configuration Gmail (tu pourras changer plus tard)
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.adminEmail,
                pass: gmailPassword,
            },
        });
    }

    async sendValidationEmail(compteRendu: any): Promise<void> {
        try {
            const mailOptions = {
                from: this.adminEmail,
                to: this.adminEmail,
                subject: `✅ Compte rendu validé - ${compteRendu.nom_rucher}`,
                html: this.generateEmailHtml(compteRendu),
            };

            await this.transporter.sendMail(mailOptions);
            console.log('✅ Email envoyé avec succès !');
        } catch (error) {
            console.error('❌ Erreur envoi email:', error);
            throw error;
        }
    }

    private generateEmailHtml(compteRendu: any): string {
        return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f59e0b;">🐝 Nouveau compte rendu validé</h2>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>📅 Date :</strong> ${compteRendu.date ? new Date(compteRendu.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}</p>
        <p><strong>🔖 Statut :</strong> ${compteRendu.statut}</p>
      </div>
      
      ${compteRendu.observations_texte ? `
  <div style="margin: 20px 0;">
    <h3>📝 Observations :</h3>
    <p style="white-space: pre-wrap;">${compteRendu.observations_texte}</p>
  </div>
` : ''}

      
      ${compteRendu.photos && compteRendu.photos.length > 0 ? `
        <div style="margin: 20px 0;">
          <h3>📷 Photos :</h3>
          <p>${compteRendu.photos.length} photo(s) jointe(s)</p>
        </div>
      ` : ''}
      
      <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
        Les Échoruches - Gestion apicole
      </p>
    </div>
  `;
    }
}