import type { User, AuthResponse, LoginCredentials } from '~/types'

export const useAuth = () => {
  // État central de l'utilisateur avec typage correct
  const user = useState<User | null>('auth.user', () => null)
  const token = useState<string | null>('auth.token', () => null)

  // Connexion APICULTEUR
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
      firestoreId: response.apiculteur.id,  // ← ID Firestore en bonus
      role: 'apiculteur'
    }

    token.value = response.token

    return response
  }

  // Connexion ADMIN
  const loginAdmin = async (credentials: LoginCredentials) => {
    const response = await $fetch<any>('http://localhost:3001/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: credentials
    })

    // ✅ STOCKAGE CENTRALISÉ pour admin
    user.value = {
      id: response.uid,                    // ← UID Firebase (clé principale)
      email: response.email,
      firstName: response.admin.firstName,
      lastName: response.admin.lastName,
      phone: response.admin.phone || '',
      firestoreId: response.admin.id,      // ← ID Firestore de l'admin
      role: 'admin'
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

  // Récupération de l'utilisateur
  const getUser = (): User | null => user.value

  return {
    user: user as Readonly<Ref<User | null>>,
    token: token as Readonly<Ref<string | null>>,
    login,
    loginAdmin,
    logout,
    isAuthenticated,
    getUserId,
    getToken,
    getUser
  }
}