import { Module } from '@nestjs/common';
import { BaseFirestoreService } from './base-firestore.service';
import { ApiculteurFirestoreService } from './apiculteur-firestore.service';
import { RegistreFirestoreService } from './registre-firestore.service';
import { EntrepriseFirestoreService } from './entreprise-firestore.service';
import { AdminFirestoreService } from './admin-firestore.service';
import { RendezVousFirestoreService } from './rendez-vous-firestore.service';
import { CompteRenduFirestoreService } from './compte-rendu-firestore.service';

@Module({
  imports: [], // ← Importe FirebaseModule pour avoir accès à FIRESTORE
  providers: [
    BaseFirestoreService,
    ApiculteurFirestoreService,
    RegistreFirestoreService,
    EntrepriseFirestoreService,
    AdminFirestoreService,
    RendezVousFirestoreService,
    CompteRenduFirestoreService,
  ],
  exports: [
    ApiculteurFirestoreService,
    RegistreFirestoreService,
    EntrepriseFirestoreService,
    AdminFirestoreService,
    RendezVousFirestoreService,
    CompteRenduFirestoreService,
  ],
})
export class FirestoreModule {}