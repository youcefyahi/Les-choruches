export interface CreatePhotoSuggestion {
  categorie: 'etat_general' | 'couvain' | 'reine' | 'provisions' | 'sante' | 'materiel';
  titre: string;
  description: string;
  conseils: string[];
  actionCompatible: string[];
  priorite: 'essentielle' | 'recommandee' | 'optionnelle';
  bonnesPratiques: string[];
}
