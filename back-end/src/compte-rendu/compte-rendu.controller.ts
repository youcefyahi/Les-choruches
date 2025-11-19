import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CompteRenduService } from './compte-rendu.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('comptes-rendus')
@UseGuards(AuthGuard)
export class ComptesRendusController {
  constructor(private comptesRendusService: CompteRenduService) {}

  @Post()
  async create(@Body() data: any, @Request() req) {
    const compteRenduData = {
      ...data,
      apiculteur_id: req.user.id,
      statut: 'brouillon',
    };
    const id = await this.comptesRendusService.create(compteRenduData);
    return { success: true, id };
  }

  /**
   * Lister les comptes rendus en attente (admin uniquement)
   * ⚠️ IMPORTANT : Cette route DOIT être AVANT @Get(':id')
   */
  @Get('en-attente')
  @UseGuards(AdminGuard)
  async getComptesRendusEnAttente() {
    const comptesRendus = await this.comptesRendusService.getComptesRendusEnAttente();
    return { success: true, comptes_rendus: comptesRendus };
  }

  @Get('apiculteur/:apiculteurId')
  async getByApiculteur(@Param('apiculteurId') apiculteurId: string, @Request() req) {
    if (apiculteurId !== req.user.id) {
      throw new Error('Accès interdit');
    }
    const comptes_rendus = await this.comptesRendusService.getByApiculteur(apiculteurId);
    return { success: true, comptes_rendus };
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Request() req) {
    const compte_rendu = await this.comptesRendusService.getById(id);

    if (!compte_rendu) {
      throw new Error('Compte rendu introuvable');
    }

    if (compte_rendu.apiculteur_id !== req.user.id) {
      throw new Error('Accès interdit');
    }

    return { success: true, compte_rendu };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any, @Request() req) {
    const compte_rendu = await this.comptesRendusService.getById(id);

    if (!compte_rendu) {
      throw new Error('Compte rendu introuvable');
    }

    if (compte_rendu.apiculteur_id !== req.user.id) {
      throw new Error('Accès interdit');
    }

    await this.comptesRendusService.update(id, data);
    return { success: true };
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const compte_rendu = await this.comptesRendusService.getById(id);

    if (!compte_rendu) {
      throw new Error('Compte rendu introuvable');
    }

    if (compte_rendu.apiculteur_id !== req.user.id) {
      throw new Error('Accès interdit');
    }

    await this.comptesRendusService.delete(id);
    return { success: true };
  }

  /**
   * Soumettre un compte rendu pour validation
   */
  @Patch(':id/soumettre')
  async soumettreValidation(@Param('id') id: string, @Request() req) {
    await this.comptesRendusService.soumettreValidation(id, req.user.id);
    return { success: true, message: 'Compte rendu soumis pour validation' };
  }

  /**
   * Valider un compte rendu (admin uniquement)
   */
  @Patch(':id/valider')
  @UseGuards(AdminGuard)
  async validerCompteRendu(@Param('id') id: string, @Request() req) {
    await this.comptesRendusService.validerCompteRendu(id, req.user.id);
    return { success: true, message: 'Compte rendu validé' };
  }

  /**
   * Rejeter un compte rendu (admin uniquement)
   */
  @Patch(':id/rejeter')
  @UseGuards(AdminGuard)
  async rejeterCompteRendu(
    @Param('id') id: string,
    @Body() body: { motif: string },
    @Request() req,
  ) {
    await this.comptesRendusService.rejeterCompteRendu(id, req.user.id, body.motif);
    return { success: true, message: 'Compte rendu rejeté' };
  }
}