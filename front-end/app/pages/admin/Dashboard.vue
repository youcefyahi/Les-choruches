<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <button @click="deconnexion" class="text-red-600 hover:text-red-800 font-medium">
            Déconnexion
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
        <p class="mt-2 text-gray-600">Chargement des statistiques...</p>
      </div>

      <!-- Statistiques -->
      <div v-else>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">📊 Statistiques</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Apiculteurs -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Apiculteurs</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.nombreApiculteurs }}</p>
              </div>
              <div class="bg-blue-100 rounded-full p-3">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                  </path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Entreprises -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Entreprises</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.nombreEntreprises }}</p>
              </div>
              <div class="bg-green-100 rounded-full p-3">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                  </path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Comptes rendus -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Comptes rendus</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.nombreComptesRendus }}</p>
              </div>
              <div class="bg-yellow-100 rounded-full p-3">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
            </div>
          </div>

          <!-- En attente -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">En attente</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.nombreComptesRendusEnAttente }}</p>
              </div>
              <div class="bg-orange-100 rounded-full p-3">
                <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions rapides -->
        <h2 class="text-2xl font-bold text-gray-900 mb-6">🎯 Actions rapides</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Gestion entreprises -->
          <button @click="navigateTo('/admin/entreprises')"
            class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left">
            <div class="flex items-center space-x-4">
              <div class="bg-green-100 rounded-full p-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                  </path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Entreprises</h3>
                <p class="text-sm text-gray-600">Gérer les entreprises partenaires</p>
              </div>
            </div>
          </button>

          <!-- Validation comptes rendus -->
          <button @click="navigateTo('/admin/validation')"
            class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left">
            <div class="flex items-center space-x-4">
              <div class="bg-orange-100 rounded-full p-3">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Validation</h3>
                <p class="text-sm text-gray-600">{{ stats.nombreComptesRendusEnAttente }} en attente</p>
              </div>
            </div>
          </button>

          <!-- Comptes rendus validés -->
          <button @click="navigateTo('/admin/comptes-rendus')"
            class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left">
            <div class="flex items-center space-x-4">
              <div class="bg-yellow-100 rounded-full p-3">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Comptes rendus</h3>
                <p class="text-sm text-gray-600">Voir tous les CR validés</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { getToken, logout } = useAuth()

definePageMeta({
  middleware: 'admin'
})

// États
const loading = ref(true)
const stats = ref({
  nombreApiculteurs: 0,
  nombreEntreprises: 0,
  nombreComptesRendus: 0,
  nombreComptesRendusEnAttente: 0,
})

// Charger les stats au montage
onMounted(async () => {
  await chargerStats()
})

// Fonction pour charger les statistiques
async function chargerStats() {
  loading.value = true
  try {
    const response = await $fetch('http://localhost:3001/admin/stats', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })

    if (response.success) {
      stats.value = response.stats
    }
  } catch (err) {
    console.error('Erreur chargement stats:', err)
  } finally {
    loading.value = false
  }
}

// Déconnexion
function deconnexion() {
  logout()
  navigateTo('/admin/login')
}
</script>