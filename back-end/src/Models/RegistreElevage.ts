import { Deplacement } from './Deplacement';
import { Recolte } from './Recolte';
import { TraitementVarroa } from './TraitementVarroa';
import { Nourrissement } from './Nourrissement';
import { MaladieTraitement } from './MaladieTraitement';
import { Observation } from './Observation';


export interface RegistreElevage {
  id: string;
  apiculteurId: string;
  
  // Informations du rucher
  nomRucher: string;
  adresseRucher: string;
  
  // Identification de la ruche
  identificationRuche: string;
  
  // Informations sur la reine
  race?: string;
  marquee: boolean;
  origine?: string;
  
  // Déplacements
  deplacements: Deplacement[];
  
  // Récoltes
  recoltes: Recolte[];
  
  // Traitements varroa
  traitementsVarroa: TraitementVarroa[];
  
  // Nourrissement
  nourrissements: Nourrissement[];
  
  // Maladies et traitements
  maladiesTraitements: MaladieTraitement[];
  
  // Observations
  observations: Observation[];
  
  createdAt: Date;
  updatedAt: Date;
}