<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Google Calendar</h3>
        <p v-if="!isConnected" class="text-sm text-gray-500">
          Synchronisez vos rendez-vous avec votre agenda Google
        </p>
        <p v-else class="text-sm text-green-600">
          ✅ Connecté à Google Calendar
        </p>
      </div>
      
      <div>
        <button
          v-if="!isConnected"
          @click="connectGoogleCalendar"
          :disabled="loading"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? 'Connexion...' : 'Connecter' }}
        </button>
        
        <button
          v-else
          @click="disconnectGoogleCalendar"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Déconnecter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const isConnected = ref(false)

// Vérifier si l'utilisateur est déjà connecté à Google Calendar
onMounted(() => {
  checkGoogleCalendarConnection()
})

function checkGoogleCalendarConnection() {
  const accessToken = localStorage.getItem('google_access_token')
  const refreshToken = localStorage.getItem('google_refresh_token')
  
  if (accessToken && refreshToken) {
    isConnected.value = true
  }
}

async function connectGoogleCalendar() {
  try {
    loading.value = true
    
    // Appeler le backend pour obtenir l'URL d'authentification Google
    const response = await $fetch('http://localhost:3001/google-calendar/auth-url')
    
    if (response.authUrl) {
      // Rediriger vers Google pour l'authentification
      window.location.href = response.authUrl
    }
  } catch (error) {
    console.error('Erreur lors de la connexion Google Calendar:', error)
    alert('Erreur lors de la connexion à Google Calendar')
  } finally {
    loading.value = false
  }
}

function disconnectGoogleCalendar() {
  // Supprimer les tokens stockés
  localStorage.removeItem('google_access_token')
  localStorage.removeItem('google_refresh_token')
  isConnected.value = false
  
  alert('Déconnecté de Google Calendar')
}
</script>