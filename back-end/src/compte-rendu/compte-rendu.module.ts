import { Module } from '@nestjs/common';
import { ComptesRendusController } from './compte-rendu.controller';
import { CompteRenduService } from './compte-rendu.service';

@Module({
  controllers: [ComptesRendusController],
  providers: [CompteRenduService],
  exports: [CompteRenduService],  // ← Exporte le service pour MurModule
})
export class ComptesRendusModule {}