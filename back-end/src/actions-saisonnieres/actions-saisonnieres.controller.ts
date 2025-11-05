import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ActionsSaisonnieresService } from './actions-saisonnieres.service';
import type { CreateActionSaisonniere } from '../Models/actions-saisonnieres/CreateActionSaisonniere';
import type  { UpdateActionSaisonniere } from '../Models/actions-saisonnieres/UpdateActionSaisonniere';

@Controller('actions-saisonnieres')
export class ActionsSaisonnieresController {
  constructor(private readonly actionsSaisonnieresService: ActionsSaisonnieresService) {}

  // Créer une nouvelle action saisonnière
  @Post()
  async createAction(@Body() actionData: CreateActionSaisonniere) {
    try {
      const actionId = await this.actionsSaisonnieresService.createAction(actionData);
      return { success: true, actionId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Récupérer toutes les actions d'un apiculteur
  @Get('apiculteur/:apiculteurId')
  async getActionsByApiculteur(@Param('apiculteurId') apiculteurId: string) {
    try {
      const actions = await this.actionsSaisonnieresService.getActionsByApiculteur(apiculteurId);
      return { success: true, actions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Récupérer les actions du mois en cours
  @Get('apiculteur/:apiculteurId/current-month')
  async getActionsCurrentMonth(@Param('apiculteurId') apiculteurId: string) {
    try {
      const actions = await this.actionsSaisonnieresService.getActionsCurrentMonth(apiculteurId);
      return { success: true, actions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Marquer une action comme terminée
  @Put(':actionId/complete')
  async completeAction(@Param('actionId') actionId: string) {
    try {
      await this.actionsSaisonnieresService.completeAction(actionId);
      return { success: true, message: 'Action marquée comme terminée' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Mettre à jour une action
  @Put(':actionId')
  async updateAction(
    @Param('actionId') actionId: string,
    @Body() updateData: UpdateActionSaisonniere
  ) {
    try {
      await this.actionsSaisonnieresService.updateAction(actionId, updateData);
      return { success: true, message: 'Action mise à jour' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Supprimer une action
  @Delete(':actionId')
  async deleteAction(@Param('actionId') actionId: string) {
    try {
      await this.actionsSaisonnieresService.deleteAction(actionId);
      return { success: true, message: 'Action supprimée' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}