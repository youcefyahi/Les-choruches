import type { ActionsCurrentMonthResponse, UpdateActionResponse, ActionSaisonniere } from '~/types/actionsSaisonnieres'

/**
 * Service pour gérer les actions saisonnières
 */
export const actionsSaisonnieresService = {
  /**
   * Récupère les actions du mois en cours pour un apiculteur
   */
  async getCurrentMonthActions(userId: string): Promise<ActionSaisonniere[]> {
    try {
      const response = await $fetch<ActionsCurrentMonthResponse>(
        `http://localhost:3001/actions-saisonnieres/apiculteur/${userId}/current-month`
      )
      
      if (response.success) {
        return response.actions
      }
      
      return []
    } catch (error) {
      console.error('Erreur chargement actions:', error)
      throw error
    }
  },

  /**
   * Met à jour le statut d'une action
   */
  async updateActionStatus(actionId: string, status: string): Promise<boolean> {
    try {
      const response = await $fetch<UpdateActionResponse>(
        `http://localhost:3001/actions-saisonnieres/${actionId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: { status }
        }
      )

      return response.success
    } catch (error) {
      console.error('Erreur mise à jour action:', error)
      throw error
    }
  }
}