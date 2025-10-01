import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { RegistresService } from './registres.service';
import { RegistreElevage } from '../Models/RegistreElevage';

@Controller('registres')
export class RegistresController {
  constructor(private registresService: RegistresService) { }

  @Post()
  async createRegistre(@Body() body: Omit<RegistreElevage, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.registresService.createRegistre(body);
  }

  @Post(':id/observations')
  async addObservation(
    @Param('id') registreId: string,
    @Body() observation: { date: Date; content: string }
  ) {
    return await this.registresService.addObservation(registreId, observation);
  }
  @Get('apiculteur/:apiculteurId')
  async getRegistresByApiculteur(@Param('apiculteurId') apiculteurId: string) {
    return await this.registresService.getRegistresByApiculteur(apiculteurId);
  }

  @Get(':id')
  async getRegistre(@Param('id') id: string) {
    return await this.registresService.getRegistre(id);
  }

  @Patch(':id')
  async updateRegistre(@Param('id') id: string, @Body() body: Partial<RegistreElevage>) {
    return await this.registresService.updateRegistre(id, body);
  }

  // // DEPLACEMENT // // 

  @Post(':id/deplacements')
  async addDeplacement(
    @Param('id') registreId: string,
    @Body() deplacement: { date: Date; nouvelleAdresse: string }
  ) {
    return await this.registresService.addDeplacement(registreId, deplacement);
  }

  // // DEPLACEMENT // // 

  // // RECOLTE // // 

  @Post(':id/recoltes')
  async addRecolte(
    @Param('id') registreId: string,
    @Body() recolte: { date: Date; volume: number }
  ) {
    return await this.registresService.addRecolte(registreId, recolte);
  }

  // // TRAITEMENT // // 

  @Post(':id/traitements-varroa')
  async addTraitementVarroa(
    @Param('id') registreId: string,
    @Body() traitement: { date: Date; produit: string }
  ) {
    return await this.registresService.addTraitementVarroa(registreId, traitement);
  }
  // // NOURISEMENT // // 
  @Post(':id/nourrissements')
  async addNourrissement(
    @Param('id') registreId: string,
    @Body() nourrissement: { date: Date; quantite: number; produit: string }
  ) {
    return await this.registresService.addNourrissement(registreId, nourrissement);
  }

}