<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              @click="retourListe"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ registre?.nomRucher || 'Registre d\'élevage' }}
            </h1>
          </div>
          <button
            v-if="registre"
            @click="editerRegistre"
            class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span>Modifier</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="max-w-6xl mx-auto px-4 py-8">
      <div class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
        <p class="mt-2 text-gray-600">Chargement du registre...</p>
      </div>
    </div>

    <!-- Erreur -->
    <div v-else-if="error" class="max-w-6xl mx-auto px-4 py-8">
      <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
        {{ error }}
      </div>
    </div>

    <!-- Contenu principal -->
    <div v-else-if="registre" class="max-w-6xl mx-auto px-4 py-8">
      <!-- Informations principales -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Informations du rucher -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations du Rucher</h2>
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-gray-500">Nom du rucher</label>
              <p class="text-gray-900">{{ registre.nomRucher }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Adresse</label>
              <p class="text-gray-900">{{ registre.adresseRucher }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Identification ruche</label>
              <p class="text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">{{ registre.identificationRuche }}</p>
            </div>
          </div>
        </div>

        <!-- Informations de la reine -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations de la Reine</h2>
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-gray-500">Race</label>
              <p class="text-gray-900">{{ registre.race || 'Non spécifiée' }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Marquage</label>
              <p class="text-gray-900 flex items-center">
                <svg v-if="registre.marquee" class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                {{ registre.marquee ? 'Marquée' : 'Non marquée' }}
              </p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Origine</label>
              <p class="text-gray-900">{{ registre.origine || 'Non spécifiée' }}</p>
            </div>
          </div>
        </div>

        <!-- Statistiques rapides -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Déplacements</span>
              <span class="text-gray-900 font-semibold">{{ registre.deplacements?.length || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Récoltes</span>
              <span class="text-gray-900 font-semibold">{{ registre.recoltes?.length || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Traitements</span>
              <span class="text-gray-900 font-semibold">{{ registre.traitementsVarroa?.length || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Observations</span>
              <span class="text-gray-900 font-semibold">{{ registre.observations?.length || 0 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sections d'activités -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Déplacements récents -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Déplacements</h3>
              <button class="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                + Ajouter
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="registre.deplacements?.length > 0" class="space-y-3">
              <div v-for="deplacement in registre.deplacements.slice(-3)" :key="deplacement.id" 
                   class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p class="text-sm text-gray-900">{{ deplacement.nouvelleAdresse }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(deplacement.date) }}</p>
                </div>
              </div>
              <button v-if="registre.deplacements.length > 3" class="text-sm text-yellow-600 hover:text-yellow-700">
                Voir tous ({{ registre.deplacements.length }})
              </button>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              </svg>
              <p class="text-sm">Aucun déplacement enregistré</p>
            </div>
          </div>
        </div>

        <!-- Récoltes récentes -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Récoltes</h3>
              <button class="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                + Ajouter
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="registre.recoltes?.length > 0" class="space-y-3">
              <div v-for="recolte in registre.recoltes.slice(-3)" :key="recolte.id" 
                   class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p class="text-sm text-gray-900">{{ recolte.volume }} kg</p>
                  <p class="text-xs text-gray-500">{{ formatDate(recolte.date) }}</p>
                </div>
              </div>
              <button v-if="registre.recoltes.length > 3" class="text-sm text-yellow-600 hover:text-yellow-700">
                Voir toutes ({{ registre.recoltes.length }})
              </button>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <p class="text-sm">Aucune récolte enregistrée</p>
            </div>
          </div>
        </div>

        <!-- Traitements récents -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Traitements Varroa</h3>
              <button class="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                + Ajouter
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="registre.traitementsVarroa?.length > 0" class="space-y-3">
              <div v-for="traitement in registre.traitementsVarroa.slice(-3)" :key="traitement.id" 
                   class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p class="text-sm text-gray-900">{{ traitement.produit }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(traitement.date) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
              <p class="text-sm">Aucun traitement enregistré</p>
            </div>
          </div>
        </div>

        <!-- Observations récentes -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Observations</h3>
              <button class="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                + Ajouter
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="registre.observations?.length > 0" class="space-y-3">
              <div v-for="observation in registre.observations.slice(-3)" :key="observation.id" 
                   class="py-2 border-b border-gray-100 last:border-b-0">
                <p class="text-sm text-gray-900">{{ observation.contenu }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ formatDate(observation.date) }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <p class="text-sm">Aucune observation enregistrée</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth'
})

// Récupérer l'ID depuis l'URL
const route = useRoute()
const registreId = route.params.id

// États
const registre = ref(null)
const loading = ref(true)
const error = ref('')

// Charger le registre au montage
onMounted(async () => {
  await chargerRegistre()
})

// Fonction pour charger le registre
async function chargerRegistre() {
  loading.value = true
  error.value = ''

  try {
    const response = await $fetch(`http://localhost:3001/registres/${registreId}`)
    
    if (response.success) {
      registre.value = response.registre
    } else {
      throw new Error('Registre introuvable')
    }

  } catch (err) {
    error.value = 'Erreur lors du chargement du registre: ' + (err.message || 'Erreur inconnue')
    console.error('Erreur:', err)
  }

  loading.value = false
}

// Fonctions de navigation
function retourListe() {
  navigateTo('/registres')
}

function editerRegistre() {
  navigateTo(`/registres/${registreId}/editer`)
}

// Fonction pour formater les dates
function formatDate(dateString) {
  if (!dateString) return ''
  
  let date
  if (dateString.seconds) {
    date = new Date(dateString.seconds * 1000)
  } else {
    date = new Date(dateString)
  }
  
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>