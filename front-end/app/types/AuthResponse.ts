export interface AuthResponse {
  uid: string
  email: string
  token: string
  apiculteur: {
    id: string
    firstName: string
    lastName: string
    phone?: string
    email: string
  }
}