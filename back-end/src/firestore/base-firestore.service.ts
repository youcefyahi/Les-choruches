import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from 'firebase/firestore';

@Injectable()
export class BaseFirestoreService {
  constructor(@Inject('FIRESTORE') protected readonly firestore: Firestore) {}

  /**
   * Retourne l'instance Firestore pour les services enfants
   */
  protected getFirestoreInstance(): Firestore {
    return this.firestore;
  }
}