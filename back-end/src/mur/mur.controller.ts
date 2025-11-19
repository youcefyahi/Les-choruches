import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompteRenduService } from '../compte-rendu/compte-rendu.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('mur')
@UseGuards(AuthGuard)  // ← Protégé pour apiculteurs ET admins connectés
export class MurController {
  constructor(private comptesRendusService: CompteRenduService) {}

  @Get()
  async getMur() {
    const comptesRendus = await this.comptesRendusService.getComptesRendusValides();
    return { success: true, comptes_rendus: comptesRendus };
  }
}