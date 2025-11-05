export interface ActionSaisonniere {
  id: string;
  titre: string;
  description: string;
  saison: 'printemps' | 'ete' | 'automne' | 'hiver';
  moisOptimal: number; // 1-12 (1=janvier, 12=décembre)
  priorite: 'haute' | 'moyenne' | 'basse';
  frequence: 'unique' | 'mensuelle' | 'hebdomadaire';
  apiculteurId: string;
  status: 'a_faire' | 'en_cours' | 'terminee';
  dateEcheance?: Date;
  dateCompletion?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Optionnel - pour plus de détails
  dureeEstimee?: number; // en minutes
  materielNecessaire?: string[];
  conseils?: string;
}