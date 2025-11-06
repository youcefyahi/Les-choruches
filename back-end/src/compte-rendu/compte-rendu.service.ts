import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { CompteRendu } from '../Models/CompteRendu';

@Injectable()
export class CompteRenduService {
  constructor(private firestoreService: FirestoreService) {}

  async create(data: Omit<CompteRendu, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const now = new Date();
    const compteRendu: Omit<CompteRendu, 'id'> = {
      ...data,
      created_at: now,
      updated_at: now
    };
    
    return this.firestoreService.createCompteRendu(compteRendu);
  }

  async getByApiculteur(apiculteurId: string): Promise<CompteRendu[]> {
    return this.firestoreService.getComptesRendusByApiculteur(apiculteurId);
  }

  async getById(id: string): Promise<CompteRendu | null> {
    return this.firestoreService.getCompteRenduById(id);
  }

  async update(id: string, data: Partial<CompteRendu>): Promise<void> {
    const updateData = {
      ...data,
      updated_at: new Date()
    };
    
    return this.firestoreService.updateCompteRendu(id, updateData);
  }

  async delete(id: string): Promise<void> {
    return this.firestoreService.deleteCompteRendu(id);
  }
}