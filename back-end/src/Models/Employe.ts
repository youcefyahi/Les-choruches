export interface Employe {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
  poste?: string;
  createdAt: Date;
  updatedAt: Date;
}