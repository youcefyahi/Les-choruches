import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CompteRenduService } from './compte-rendu.service';

@Controller('comptes-rendus')
export class CompteRenduController {
  constructor(private compteRenduService: CompteRenduService) {}

  @Post()
  async create(@Body() data: any) {
    const id = await this.compteRenduService.create(data);
    return { success: true, id };
  }

  @Get('apiculteur/:apiculteurId')
  async getByApiculteur(@Param('apiculteurId') apiculteurId: string) {
    const comptes_rendus = await this.compteRenduService.getByApiculteur(apiculteurId);
    return { success: true, comptes_rendus };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const compte_rendu = await this.compteRenduService.getById(id);
    return { success: true, compte_rendu };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    await this.compteRenduService.update(id, data);
    return { success: true };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.compteRenduService.delete(id);
    return { success: true };
  }
}