import type { Photo } from './Photo'
import type { Video } from './Video'
import type { PersonnelPresent } from './PersonnelPresent'

export interface CompteRendu {
  id: string
  date: string
  observations_type: 'texte' | 'audio'
  observations_texte?: string
  observations_audio_url?: string
  photos: Photo[]
  videos: Video[]
  personnel_present: PersonnelPresent[]
  apiculteur_id: string
}