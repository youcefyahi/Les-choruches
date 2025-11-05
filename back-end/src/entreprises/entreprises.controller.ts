import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { EntreprisesService } from './entreprises.service';
import { Entreprise } from '../Models/Entreprise';

@Controller('entreprises')
export class EntreprisesController {
  constructor(private readonly entreprisesService: EntreprisesService) {}

  // Créer une entreprise (Admin uniquement)
  @Post()
  async createEntreprise(@Body() body: Omit<Entreprise, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.entreprisesService.createEntreprise(body);
  }

  // Récupérer toutes les entreprises (Admin et Apiculteurs)
  @Get()
  async getAllEntreprises() {
    return await this.entreprisesService.getAllEntreprises();
  }

  // Récupérer une entreprise par ID
  @Get(':id')
  async getEntrepriseById(@Param('id') id: string) {
    return await this.entreprisesService.getEntrepriseById(id);
  }

  // Mettre à jour une entreprise (Admin uniquement)
  @Patch(':id')
  async updateEntreprise(@Param('id') id: string, @Body() body: Partial<Entreprise>) {
    return await this.entreprisesService.updateEntreprise(id, body);
  }

  // Supprimer une entreprise (Admin uniquement)
  @Delete(':id')
  async deleteEntreprise(@Param('id') id: string) {
    return await this.entreprisesService.deleteEntreprise(id);
  }
}