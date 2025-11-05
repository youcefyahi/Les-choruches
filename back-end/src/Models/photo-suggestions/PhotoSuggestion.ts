export interface PhotoSuggestion {
  id: string;
  categorie: 'etat_general' | 'couvain' | 'reine' | 'provisions' | 'sante' | 'materiel';
  titre: string;
  description: string;
  conseils: string[];
  actionCompatible: string[];
  priorite: 'essentielle' | 'recommandee' | 'optionnelle';
  exempleImage?: string;
  bonnesPratiques: string[];
}