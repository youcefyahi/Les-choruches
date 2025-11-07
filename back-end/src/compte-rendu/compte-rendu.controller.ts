import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { CompteRenduService } from './compte-rendu.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('comptes-rendus')
@UseGuards(AuthGuard)
export class CompteRenduController {
  constructor(private compteRenduService: CompteRenduService) { }

  @Post()
  async create(@Body() data: any, @Request() req) {
    const compteRenduData = {
      ...data,
      apiculteur_id: req.user.id
    };
    const id = await this.compteRenduService.create(compteRenduData);
    return { success: true, id };
  }

  @Get('apiculteur/:apiculteurId')
  async getByApiculteur(@Param('apiculteurId') apiculteurId: string, @Request() req) {
    // ← AJOUTER CES LOGS
    console.log('🆔 CompteRendu - Comparaison:', {
      url_param: apiculteurId,
      token_user: req.user.id,
      sont_egaux: apiculteurId === req.user.id
    });

    if (apiculteurId !== req.user.id) {
      throw new Error('Accès interdit');
    }
    const comptes_rendus = await this.compteRenduService.getByApiculteur(apiculteurId);
    return { success: true, comptes_rendus };
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Request() req) {
    const compte_rendu = await this.compteRenduService.getById(id);

    // ← VÉRIFICATION NULL
    if (!compte_rendu) {
      throw new NotFoundException('Compte rendu introuvable');
    }

    if (compte_rendu.apiculteur_id !== req.user.id) {
      throw new Error('Accès interdit');
    }
    return { success: true, compte_rendu };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any, @Request() req) {
    const compte_rendu = await this.compteRenduService.getById(id);

    // ← VÉRIFICATION NULL
    if (!compte_rendu) {
      throw new NotFoundException('Compte rendu introuvable');
    }

    if (compte_rendu.apiculteur_id !== req.user.id) {
      throw new Error('Accès interdit');
    }
    await this.compteRenduService.update(id, data);
    return { success: true };
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const compte_rendu = await this.compteRenduService.getById(id);

    // ← VÉRIFICATION NULL
    if (!compte_rendu) {
      throw new NotFoundException('Compte rendu introuvable');
    }

    if (compte_rendu.apiculteur_id !== req.user.id) {
      throw new Error('Accès interdit');
    }
    await this.compteRenduService.delete(id);
    return { success: true };
  }
}