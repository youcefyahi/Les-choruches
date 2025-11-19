export default defineNuxtRouteMiddleware((to, from) => {
  const { getUser, getToken } = useAuth()
  
  const user = getUser()
  const token = getToken()
  
  // Vérifier que l'utilisateur est connecté
  if (!user || !token) {
    return navigateTo('/connexion')
  }
  
  // Optionnel : vérifier que c'est un apiculteur
  if (user.role && user.role !== 'apiculteur') {
    return navigateTo('/connexion')
  }
})