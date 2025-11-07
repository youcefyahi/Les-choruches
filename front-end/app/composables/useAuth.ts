import type { User, AuthResponse, LoginCredentials } from '~/types'

export const useAuth = () => {
  // État central de l'utilisateur avec typage correct
  const user = useState<User | null>('auth.user', () => null)
  const token = useState<string | null>('auth.token', () => null)

  // Connexion
  const login = async (credentials: LoginCredentials) => {
    const response = await $fetch<AuthResponse>('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: credentials
    })

    // ✅ STOCKAGE CENTRALISÉ avec l'UID Firebase comme référence
    user.value = {
      id: response.uid,                    // ← UID Firebase (clé principale)
      email: response.email,
      firstName: response.apiculteur.firstName,
      lastName: response.apiculteur.lastName,
      phone: response.apiculteur.phone,
      firestoreId: response.apiculteur.id  // ← ID Firestore en bonus
    }
    
    token.value = response.token

    return response
  }

  // Déconnexion
  const logout = () => {
    user.value = null
    token.value = null
  }

  // Vérification de connexion
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Récupération de l'ID principal (UID Firebase)
  const getUserId = (): string | undefined => user.value?.id

  // Récupération du token pour les requêtes API
  const getToken = (): string | null => token.value

  return {
    user: user as Readonly<Ref<User | null>>,
    token: token as Readonly<Ref<string | null>>,
    login,
    logout,
    isAuthenticated,
    getUserId,
    getToken
  }
}