import { Module } from '@nestjs/common';
import { EntreprisesController } from './entreprises.controller';
import { EntreprisesService } from './entreprises.service';
import { FirebaseModule } from '../firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [EntreprisesController],
  providers: [EntreprisesService],
})
export class EntreprisesModule {}
