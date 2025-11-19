export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  firestoreId?: string
  role?: 'apiculteur' | 'admin'
}