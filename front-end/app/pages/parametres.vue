<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="px-4 py-6 sm:px-0">
        <div class="border-b border-gray-200 pb-5">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Paramètres</h3>
          <p class="mt-2 max-w-4xl text-sm text-gray-500">
            Gérez vos préférences et intégrations
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="px-4 py-6 sm:px-0">
        <div class="space-y-6">
          <!-- Informations du compte -->
          <div class="bg-white rounded-lg shadow p-6">
            <h4 class="text-lg font-medium text-gray-900 mb-4">Informations du compte</h4>
            <div v-if="user" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700">Prénom</label>
                <p class="mt-1 text-sm text-gray-900">{{ user.firstName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom</label>
                <p class="mt-1 text-sm text-gray-900">{{ user.lastName }}</p>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="mt-1 text-sm text-gray-900">{{ user.email }}</p>
              </div>
            </div>
          </div>

          <!-- Intégrations -->
          <div>
            <h4 class="text-lg font-medium text-gray-900 mb-4">Intégrations</h4>
            <GoogleCalendarConnect />
          </div>

          <!-- Boutons d'action -->
          <div class="flex justify-between">
            <button
              @click="goToDashboard"
              class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Retour au tableau de bord
            </button>
            
            <button
              @click="logout"
              class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GoogleCalendarConnect from '~/components/GoogleCalendarConnect.vue'

const user = ref(null)

onMounted(() => {
  // Vérification d'authentification et récupération utilisateur
  const token = localStorage.getItem('token')
  const userData = localStorage.getItem('user')
  
  if (!token || !userData) {
    window.location.href = '/login'
    return
  }
  
  user.value = JSON.parse(userData)
})

function goToDashboard() {
  navigateTo('/dashboard')
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('google_access_token')
  localStorage.removeItem('google_refresh_token')
  window.location.href = '/login'
}
</script>