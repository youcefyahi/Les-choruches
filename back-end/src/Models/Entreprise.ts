import { Employe } from './Employe';

export interface Entreprise {
  id: string;
  nom: string;
  adresse: string;
  
  // Référent de l'entreprise
  referentNom: string;
  referentPrenom: string;
  referentTelephone: string;
  referentEmail?: string;
  
  // Employés de l'entreprise
  employes: Employe[];
  
  // Informations complémentaires
  nombreRuches?: number;
  notes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}