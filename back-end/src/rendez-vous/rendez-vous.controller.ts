import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { RendezVous } from '../Models/RendezVous';

@Controller('rendez-vous')
export class RendezVousController {
  constructor(private readonly rendezVousService: RendezVousService) {}

  // Créer un rendez-vous
  @Post()
  async createRendezVous(@Body() body: Omit<RendezVous, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.rendezVousService.createRendezVous(body);
  }

  // Récupérer les RDV d'un apiculteur
  @Get('apiculteur/:apiculteurId')
  async getRendezVousByApiculteur(@Param('apiculteurId') apiculteurId: string) {
    return await this.rendezVousService.getRendezVousByApiculteur(apiculteurId);
  }

  // Récupérer les RDV d'une entreprise
  @Get('entreprise/:entrepriseId')
  async getRendezVousByEntreprise(@Param('entrepriseId') entrepriseId: string) {
    return await this.rendezVousService.getRendezVousByEntreprise(entrepriseId);
  }

  // Mettre à jour un rendez-vous
  @Patch(':id')
  async updateRendezVous(@Param('id') id: string, @Body() body: Partial<RendezVous>) {
    return await this.rendezVousService.updateRendezVous(id, body);
  }
}