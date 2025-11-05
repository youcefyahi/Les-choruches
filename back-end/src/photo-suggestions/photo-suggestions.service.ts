import { Injectable } from '@nestjs/common';
import { PhotoSuggestion } from '../Models/photo-suggestions/PhotoSuggestion';
import { CategoriePhoto } from '../Models/photo-suggestions/CategoriePhoto';

@Injectable()
export class PhotoSuggestionsService {

  private readonly categories: CategoriePhoto[] = [
    {
      key: 'etat_general',
      label: 'État général',
      description: 'Vue d\'ensemble de la ruche et de son environnement',
      icon: '🏠',
      couleur: 'blue'
    },
    {
      key: 'couvain',
      label: 'Couvain',
      description: 'Œufs, larves et couvain operculé',
      icon: '🥚',
      couleur: 'yellow'
    },
    {
      key: 'reine',
      label: 'Reine',
      description: 'Présence, état et activité de la reine',
      icon: '👑',
      couleur: 'purple'
    },
    {
      key: 'provisions',
      label: 'Provisions',
      description: 'Réserves de miel et pollen',
      icon: '🍯',
      couleur: 'orange'
    },
    {
      key: 'sante',
      label: 'Santé',
      description: 'Signes de maladie ou parasites',
      icon: '🏥',
      couleur: 'red'
    },
    {
      key: 'materiel',
      label: 'Matériel',
      description: 'État des cadres, hausses et équipements',
      icon: '🔧',
      couleur: 'gray'
    }
  ];

  private readonly suggestions: PhotoSuggestion[] = [
    // ÉTAT GÉNÉRAL
    {
      id: '1',
      categorie: 'etat_general',
      titre: 'Vue d\'ensemble de la ruche',
      description: 'Photo générale montrant l\'état extérieur de la ruche',
      conseils: [
        'Prendre la photo à 2-3 mètres de distance',
        'Inclure l\'environnement immédiat',
        'Éviter les contre-jours'
      ],
      actionCompatible: ['visite', 'inspection', 'maintenance'],
      priorite: 'essentielle',
      bonnesPratiques: [
        'Photographier avant l\'ouverture',
        'Noter l\'activité à l\'entrée',
        'Documenter les conditions météo'
      ]
    },
    {
      id: '2',
      categorie: 'etat_general',
      titre: 'Activité à l\'entrée',
      description: 'Niveau d\'activité des abeilles à l\'entrée de la ruche',
      conseils: [
        'Se placer sur le côté, pas devant l\'entrée',
        'Capturer le mouvement des abeilles',
        'Prendre plusieurs photos si nécessaire'
      ],
      actionCompatible: ['visite', 'inspection'],
      priorite: 'recommandee',
      bonnesPratiques: [
        'Observer pendant 2-3 minutes avant la photo',
        'Noter l\'heure de la prise de vue'
      ]
    },

    // COUVAIN
    {
      id: '3',
      categorie: 'couvain',
      titre: 'Cadre de couvain ouvert',
      description: 'Œufs et larves visibles dans les alvéoles',
      conseils: [
        'Tenir le cadre face au soleil',
        'Incliner légèrement pour éviter les reflets',
        'Faire la mise au point sur les alvéoles'
      ],
      actionCompatible: ['visite', 'recherche_reine', 'evaluation_colonie'],
      priorite: 'essentielle',
      bonnesPratiques: [
        'Photographier le centre du cadre',
        'Vérifier la régularité du couvain',
        'Noter la présence d\'œufs récents'
      ]
    },
    {
      id: '4',
      categorie: 'couvain',
      titre: 'Couvain operculé',
      description: 'Nymphes dans les alvéoles operculées',
      conseils: [
        'Montrer la régularité des opercules',
        'Éviter les zones d\'ombre',
        'Capturer les différences de couleur'
      ],
      actionCompatible: ['visite', 'evaluation_colonie'],
      priorite: 'recommandee',
      bonnesPratiques: [
        'Comparer avec les zones de couvain ouvert',
        'Noter la compacité du couvain'
      ]
    },

    // REINE
    {
      id: '5',
      categorie: 'reine',
      titre: 'Reine sur le cadre',
      description: 'Photo de la reine identifiée sur un cadre',
      conseils: [
        'S\'approcher lentement et calmement',
        'Utiliser le zoom plutôt que de se rapprocher',
        'Attendre qu\'elle soit relativement immobile'
      ],
      actionCompatible: ['recherche_reine', 'marquage_reine', 'visite'],
      priorite: 'essentielle',
      bonnesPratiques: [
        'Photographier le marquage si présent',
        'Montrer son entourage (suivantes)',
        'Noter son comportement'
      ]
    },

    // PROVISIONS
    {
      id: '6',
      categorie: 'provisions',
      titre: 'Cadre de miel operculé',
      description: 'Réserves de miel dans les cadres',
      conseils: [
        'Montrer la différence entre operculé et non operculé',
        'Inclure une vue d\'ensemble du cadre',
        'Éviter les reflets sur le miel'
      ],
      actionCompatible: ['evaluation_reserves', 'recolte', 'visite'],
      priorite: 'essentielle',
      bonnesPratiques: [
        'Estimer la quantité visuellement',
        'Noter la couleur du miel',
        'Photographier les deux faces si possible'
      ]
    },

    // SANTÉ
    {
      id: '7',
      categorie: 'sante',
      titre: 'Abeilles mortes devant la ruche',
      description: 'Documentation des signes de mortalité',
      conseils: [
        'Photographier près de l\'entrée',
        'Inclure une référence d\'échelle',
        'Montrer l\'état des abeilles mortes'
      ],
      actionCompatible: ['diagnostic_sante', 'visite', 'inspection'],
      priorite: 'essentielle',
      bonnesPratiques: [
        'Noter la quantité approximative',
        'Observer les symptômes visibles',
        'Photographier avant de nettoyer'
      ]
    }
  ];

  // Récupérer toutes les catégories
  getCategories(): CategoriePhoto[] {
    return this.categories;
  }

  // Récupérer toutes les suggestions
  getAllSuggestions(): PhotoSuggestion[] {
    return this.suggestions;
  }

  // Récupérer les suggestions par catégorie
  getSuggestionsByCategorie(categorie: string): PhotoSuggestion[] {
    return this.suggestions.filter(s => s.categorie === categorie);
  }

  // Récupérer les suggestions compatibles avec une action
  getSuggestionsForAction(actionType: string): PhotoSuggestion[] {
    return this.suggestions.filter(s => 
      s.actionCompatible.some(action => 
        action.toLowerCase().includes(actionType.toLowerCase()) ||
        actionType.toLowerCase().includes(action.toLowerCase())
      )
    );
  }

  // Récupérer les suggestions par priorité
  getSuggestionsByPriorite(priorite: 'essentielle' | 'recommandee' | 'optionnelle'): PhotoSuggestion[] {
    return this.suggestions.filter(s => s.priorite === priorite);
  }
}