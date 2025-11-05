import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import type { Response } from 'express';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  // Endpoint pour obtenir l'URL d'authentification Google
  @Get('auth-url')
  getAuthUrl() {
    const authUrl = this.googleCalendarService.getAuthUrl();
    return { authUrl };
  }

  // Endpoint pour gérer le callback de Google OAuth
  @Get('callback')
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      if (!code) {
        return res.status(400).json({ error: 'Code d\'autorisation manquant' });
      }

      const tokens = await this.googleCalendarService.getTokensFromCode(code);
      
      // Rediriger vers le frontend avec les tokens (en production, stockez-les de manière sécurisée)
      const redirectUrl = `http://localhost:3000/auth/success?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`;
      return res.redirect(redirectUrl);
      
    } catch (error) {
      console.error('Erreur dans le callback:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'authentification' });
    }
  }

  // Endpoint pour créer un événement dans Google Calendar
  @Post('create-event')
  async createEvent(@Body() eventData: {
    accessToken: string;
    refreshToken: string;
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    attendeeEmail?: string;
  }) {
    try {
      const result = await this.googleCalendarService.createCalendarEvent(
        eventData.accessToken,
        eventData.refreshToken,
        {
          title: eventData.title,
          description: eventData.description,
          startTime: new Date(eventData.startTime),
          endTime: new Date(eventData.endTime),
          attendeeEmail: eventData.attendeeEmail
        }
      );

      return result;
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
      return { success: false, error: error.message };
    }
  }
}