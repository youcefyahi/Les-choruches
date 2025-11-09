export interface CompteRendu {
  id: string;
  apiculteur_id: string;
  date: string;

  // Observations - audio OU texte
  observations_type: 'audio' | 'texte';
  observations_texte?: string;
  observations_audio_url?: string;

  // Médias
  photos: Array<{
    url: string;
    nom_fichier: string;
  }>;
  videos: Array<{
    url: string;
    nom_fichier: string;
  }>;

  // Personnel présent
  personnel_present: Array<{
    nom: string;
    role?: string;
  }>;

  created_at: Date;
  updated_at: Date;

  // Système de stockage temporaire
  is_temporary?: boolean;        // true = temporaire, false/undefined = permanent
  expires_at?: Date;             // Date d'expiration (created_at + 2 jours)

  // ✅ NOUVEAU - Système de validation
  statut: 'brouillon' | 'en_attente_validation' | 'validé' | 'rejeté';
  date_validation?: Date;        // Date de validation/rejet
  validé_par?: string;           // ID de l'admin qui a validé/rejeté
  motif_rejet?: string;          // Raison du rejet (si rejeté)
}