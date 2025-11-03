export interface RendezVous {
  id: string;
  
  // Qui prend le RDV
  apiculteurId: string;
  apiculteurNom: string;
  apiculteurPrenom: string;
  apiculteurEmail: string;
  apiculteurTelephone: string;
  
  // Avec quelle entreprise
  entrepriseId: string;
  entrepriseNom: string;
  
  // Contact dans l'entreprise
  contactNom: string;
  contactPrenom: string;
  contactTelephone: string;
  
  // Détails du RDV
  dateHeure: Date;
  duree: number; // en minutes
  motif: string;
  notes?: string;
  
  // Statut
  statut: 'en_attente' | 'confirme' | 'annule' | 'termine';
  
  // Google Calendar
  googleEventId?: string;
  
  createdAt: Date;
  updatedAt: Date;
}






