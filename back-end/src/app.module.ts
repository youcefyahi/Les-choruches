import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RegistresModule } from './registres/registres.module';
import { EntreprisesModule } from './entreprises/entreprises.module';
import { AdminModule } from './admin/admin.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { ActionsSaisonnieresModule } from './actions-saisonnieres/actions-saisonnieres.module';
import { PhotoSuggestionsModule } from './photo-suggestions/photo-suggestions.module';
import { CompteRenduModule } from './compte-rendu/compte-rendu.module';



@Module({
  imports: [ConfigModule.forRoot(),FirebaseModule,AuthModule,RegistresModule,EntreprisesModule,AdminModule,RendezVousModule,GoogleCalendarModule,ActionsSaisonnieresModule,PhotoSuggestionsModule,CompteRenduModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
