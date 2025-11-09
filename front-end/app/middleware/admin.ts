export default defineNuxtRouteMiddleware((to, from) => {
  const { getUser, getToken } = useAuth()
  
  const user = getUser()
  const token = getToken()
  
  // Vérifier que l'utilisateur est connecté ET qu'il est admin
  if (!user || !token) {
    return navigateTo('/admin/login')
  }
  
  if (user.role !== 'admin') {
    return navigateTo('/admin/login')
  }
})