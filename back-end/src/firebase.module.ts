import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: (configService: ConfigService) => {
        const firebaseConfig = {
          apiKey: configService.get('FIREBASE_API_KEY'),
          authDomain: configService.get('FIREBASE_AUTH_DOMAIN'),
          projectId: configService.get('FIREBASE_PROJECT_ID'),
          storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
          messagingSenderId: configService.get('FIREBASE_MESSAGING_SENDER_ID'),
          appId: configService.get('FIREBASE_APP_ID'),
        };
        
        const app = initializeApp(firebaseConfig);
        return getFirestore(app);
      },
      inject: [ConfigService],
    },
    {
      provide: 'FIREBASE_AUTH',
      useFactory: (configService: ConfigService) => {
        const firebaseConfig = {
          apiKey: configService.get('FIREBASE_API_KEY'),
          authDomain: configService.get('FIREBASE_AUTH_DOMAIN'),
          projectId: configService.get('FIREBASE_PROJECT_ID'),
          storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
          messagingSenderId: configService.get('FIREBASE_MESSAGING_SENDER_ID'),
          appId: configService.get('FIREBASE_APP_ID'),
        };
        
        const app = initializeApp(firebaseConfig);
        return getAuth(app);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIRESTORE', 'FIREBASE_AUTH'],
})
export class FirebaseModule {}