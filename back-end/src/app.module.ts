import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RegistresModule } from './registres/registres.module';



@Module({
  imports: [ConfigModule.forRoot(),FirebaseModule,AuthModule,RegistresModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
