export type ActionSaisonniere = {
  id: string
  titre: string
  description: string
  moisOptimal: number
  status: 'a_faire' | 'en_cours' | 'terminee'
  apiculteurId: string
  createdAt: Date
  updatedAt: Date
}

export type ActionsCurrentMonthResponse = {
  success: boolean
  actions: ActionSaisonniere[]
}

export type UpdateActionResponse = {
  success: boolean
  message?: string
}