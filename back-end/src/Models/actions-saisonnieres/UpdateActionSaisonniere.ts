export interface UpdateActionSaisonniere {
  status?: 'a_faire' | 'en_cours' | 'terminee';
  dateCompletion?: Date;
  conseils?: string;
  
  // Possibilité de modifier d'autres champs
  titre?: string;
  description?: string;
  priorite?: 'haute' | 'moyenne' | 'basse';
  dureeEstimee?: number;
  materielNecessaire?: string[];
  dateEcheance?: Date;
}