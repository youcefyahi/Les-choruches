<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
            <p class="mt-1 text-sm text-gray-600">Bienvenue, {{ admin?.firstName }} {{ admin?.lastName }}</p>
          </div>
          <button @click="handleLogout"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
              </path>
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Cards de navigation -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card Entreprises -->
        <div @click="goToEntreprises"
          class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Entreprises</h3>
              <p class="text-sm text-gray-600 mt-1">Gérer les entreprises</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                </path>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl font-bold text-gray-900">{{ stats.entreprises }}</p>
            <p class="text-xs text-gray-500">entreprises enregistrées</p>
          </div>
        </div>

        <!-- Card Validation -->
        <div @click="goToValidation"
          class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Validation</h3>
              <p class="text-sm text-gray-600 mt-1">Comptes rendus en attente</p>
            </div>
            <div class="bg-orange-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl font-bold text-gray-900">{{ stats.comptesRendusEnAttente }}</p>
            <p class="text-xs text-gray-500">à valider</p>
          </div>
        </div>

        <!-- Card Registres -->
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Registres</h3>
              <p class="text-sm text-gray-600 mt-1">Registres d'élevage</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl font-bold text-gray-900">{{ stats.registres }}</p>
            <p class="text-xs text-gray-500">registres créés</p>
          </div>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button @click="goToEntreprises"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span class="text-gray-700">Nouvelle entreprise</span>
            </button>
            
            <button @click="goToValidation"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
              </svg>
              <span class="text-gray-700">Valider les comptes rendus</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { getUser, getToken, logout } = useAuth()

definePageMeta({
  middleware: 'admin'
})

const admin = ref(null)
const stats = ref({
  entreprises: 0,
  comptesRendusEnAttente: 0,
  registres: 0
})

onMounted(async () => {
  // Récupérer les infos de l'admin avec useAuth
  admin.value = getUser()
  
  if (!admin.value) {
    navigateTo('/admin/login')
    return
  }

  // Charger les statistiques
  await loadStats()
})

async function loadStats() {
  try {
    const token = getToken()
    
    // Charger le nombre d'entreprises
    const entreprisesResponse = await $fetch('http://localhost:3001/entreprises', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (entreprisesResponse.success) {
      stats.value.entreprises = entreprisesResponse.entreprises.length
    }

    // Charger le nombre de comptes rendus en attente
    const comptesRendusResponse = await $fetch('http://localhost:3001/comptes-rendus/en-attente', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (comptesRendusResponse.success) {
      stats.value.comptesRendusEnAttente = comptesRendusResponse.comptes_rendus.length
    }
  } catch (err) {
    console.error('Erreur lors du chargement des stats:', err)
  }
}

function goToEntreprises() {
  navigateTo('/admin/entreprises')
}

function goToValidation() {
  navigateTo('/admin/validation')
}

async function handleLogout() {
  await logout()
  navigateTo('/admin/login')
}
</script>