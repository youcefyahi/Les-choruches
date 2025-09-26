import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RegistresService } from './registres.service';
import { RegistreElevage } from '../Models/RegistreElevage';

@Controller('registres')
export class RegistresController {
  constructor(private registresService: RegistresService) {}

  @Post()
  async createRegistre(@Body() body: Omit<RegistreElevage, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.registresService.createRegistre(body);
  }

  @Get('apiculteur/:apiculteurId')
  async getRegistresByApiculteur(@Param('apiculteurId') apiculteurId: string) {
    return await this.registresService.getRegistresByApiculteur(apiculteurId);
  }

  @Get(':id')
  async getRegistre(@Param('id') id: string) {
    return await this.registresService.getRegistre(id);
  }
}