<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="loading" class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Configuration de Google Calendar...</p>
        </div>
        
        <div v-else-if="success" class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-lg font-medium text-gray-900 mb-2">Google Calendar connecté !</h2>
          <p class="text-sm text-gray-600 mb-6">
            Vos rendez-vous seront maintenant synchronisés avec votre agenda Google.
          </p>
          <button
            @click="goToDashboard"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Retour au tableau de bord
          </button>
        </div>
        
        <div v-else class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 class="text-lg font-medium text-gray-900 mb-2">Erreur de connexion</h2>
          <p class="text-sm text-gray-600 mb-6">
            Une erreur s'est produite lors de la connexion à Google Calendar.
          </p>
          <button
            @click="goToDashboard"
            class="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const loading = ref(true)
const success = ref(false)

onMounted(async () => {
  await handleGoogleCallback()
})

async function handleGoogleCallback() {
  try {
    // Récupérer les tokens depuis l'URL
    const accessToken = route.query.access_token
    const refreshToken = route.query.refresh_token
    
    if (accessToken && refreshToken) {
      // Stocker les tokens dans localStorage
      localStorage.setItem('google_access_token', accessToken)
      localStorage.setItem('google_refresh_token', refreshToken)
      
      success.value = true
    } else {
      success.value = false
    }
  } catch (error) {
    console.error('Erreur lors du traitement du callback Google:', error)
    success.value = false
  } finally {
    loading.value = false
  }
}

function goToDashboard() {
  navigateTo('/dashboard')
}
</script>