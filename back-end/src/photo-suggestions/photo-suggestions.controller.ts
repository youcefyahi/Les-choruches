import { Controller, Get, Param } from '@nestjs/common';
import { PhotoSuggestionsService } from './photo-suggestions.service';

@Controller('photo-suggestions')
export class PhotoSuggestionsController {
  constructor(private readonly photoSuggestionsService: PhotoSuggestionsService) {}

  // Récupérer toutes les catégories
  @Get('categories')
  getCategories() {
    try {
      const categories = this.photoSuggestionsService.getCategories();
      return { success: true, categories };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Récupérer toutes les suggestions
  @Get('suggestions')
  getAllSuggestions() {
    try {
      const suggestions = this.photoSuggestionsService.getAllSuggestions();
      return { success: true, suggestions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Récupérer les suggestions par catégorie
  @Get('suggestions/categorie/:categorie')
  getSuggestionsByCategorie(@Param('categorie') categorie: string) {
    try {
      const suggestions = this.photoSuggestionsService.getSuggestionsByCategorie(categorie);
      return { success: true, suggestions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Récupérer les suggestions pour une action spécifique
  @Get('suggestions/action/:actionType')
  getSuggestionsForAction(@Param('actionType') actionType: string) {
    try {
      const suggestions = this.photoSuggestionsService.getSuggestionsForAction(actionType);
      return { success: true, suggestions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Récupérer les suggestions par priorité
  @Get('suggestions/priorite/:priorite')
  getSuggestionsByPriorite(@Param('priorite') priorite: 'essentielle' | 'recommandee' | 'optionnelle') {
    try {
      const suggestions = this.photoSuggestionsService.getSuggestionsByPriorite(priorite);
      return { success: true, suggestions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}