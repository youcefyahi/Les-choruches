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







@Module({
  imports: [ConfigModule.forRoot(),FirebaseModule,AuthModule,RegistresModule,EntreprisesModule,AdminModule,RendezVousModule,GoogleCalendarModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
