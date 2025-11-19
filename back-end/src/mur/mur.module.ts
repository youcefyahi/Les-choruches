import { Module } from '@nestjs/common';
import { MurController } from './mur.controller';
import { ComptesRendusModule } from '../compte-rendu/compte-rendu.module';

@Module({
  imports: [ComptesRendusModule],
  controllers: [MurController],
})
export class MurModule {}