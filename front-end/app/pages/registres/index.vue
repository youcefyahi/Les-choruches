<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="retourDashboard" class="text-gray-500 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-gray-900">Mes Registres d'Élevage</h1>
          </div>
          <button @click="nouveauRegistre"
            class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Nouveau Registre</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
        <p class="mt-2 text-gray-600">Chargement des registres...</p>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Liste vide -->
      <div v-else-if="registres.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
          </path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun registre</h3>
        <p class="mt-1 text-sm text-gray-500">Commencez par créer votre premier registre d'élevage.</p>
        <div class="mt-6">
          <button @click="nouveauRegistre"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Créer un registre
          </button>
        </div>
      </div>

      <!-- Liste des registres -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="registre in registres" :key="registre.id"
          class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          @click="voirRegistre(registre.id)">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 truncate">
                  {{ registre.nomRucher }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  Ruche: {{ registre.identificationRuche }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Actif
                </span>
              </div>
            </div>

            <div class="mt-4">
              <p class="text-sm text-gray-600 flex items-center">
                <svg class="w-3 h-3 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ registre.adresseRucher }}
              </p>
            </div>

            <div class="mt-4">
              <div class="flex items-center space-x-4 text-xs text-gray-500">
                <span v-if="registre.race" class="flex items-center">
                  🐝 Race: {{ registre.race }}
                </span>
                <span class="flex items-center">
                  ✅ {{ registre.marquee ? 'Marquée' : 'Non marquée' }}
                </span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <p class="text-xs text-gray-500">
                Créé le {{ formatDate(registre.createdAt) }}
              </p>
            </div>

            <div class="mt-4 flex justify-between items-center">
              <button @click.stop="voirRegistre(registre.id)"
                class="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                Voir détails
              </button>
              <div class="flex space-x-2">
                <button @click.stop="editerRegistre(registre.id)" class="text-gray-400 hover:text-gray-600"
                  title="Modifier">
                  ✏️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { getToken, getUser } = useAuth()  // ✅ Changé: ajouté getUser

const registres = ref([])
const loading = ref(true)
const error = ref('')

// Chargement au montage
onMounted(() => {
  chargerRegistres()
})

// definePageMeta({
//   middleware: 'auth'
// })

// Fonction principale
async function chargerRegistres() {
  loading.value = true
  error.value = ''
  
  // ✅ Récupère l'utilisateur complet et utilise firestoreId
  const user = getUser()
  const userId = user?.firestoreId
  
  console.log('🔍 FirestoreID envoyé au backend:', userId)
  
  if (!userId) {
    error.value = 'Utilisateur non connecté'
    loading.value = false
    return
  }

  try {
    const response = await $fetch(`http://localhost:3001/registres/apiculteur/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })

    if (response.success) {
      registres.value = response.registres
    } else {
      throw new Error('Erreur lors du chargement des registres')
    }
  } catch (err) {
    console.error('Erreur:', err)
    error.value = 'Erreur lors du chargement des registres: ' + (err.message || 'Erreur inconnue')
  } finally {
    loading.value = false
  }
}

// Navigation
function retourDashboard() {
  navigateTo('/dashboard')
}

function nouveauRegistre() {
  navigateTo('/registres/nouveau')
}

function voirRegistre(id) {
  navigateTo(`/registres/${id}`)
}

function editerRegistre(id) {
  navigateTo(`/registres/${id}/editer`)
}

// Formatage date
function formatDate(dateString) {
  if (!dateString) return ''
  const date = dateString.seconds
    ? new Date(dateString.seconds * 1000)
    : new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>