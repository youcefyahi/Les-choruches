export interface CreateActionSaisonniere {
  titre: string;
  description: string;
  saison: 'printemps' | 'ete' | 'automne' | 'hiver';
  moisOptimal: number; // 1-12
  priorite: 'haute' | 'moyenne' | 'basse';
  frequence: 'unique' | 'mensuelle' | 'hebdomadaire';
  apiculteurId: string;
  
  // Optionnel
  dureeEstimee?: number; // en minutes
  materielNecessaire?: string[];
  conseils?: string;
  dateEcheance?: Date; // Si une date spécifique est requise
}