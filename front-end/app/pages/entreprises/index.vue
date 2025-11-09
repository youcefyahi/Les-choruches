<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="retourDashboard" class="text-gray-500 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-3xl font-bold text-gray-900">Entreprises partenaires</h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
        <p class="mt-2 text-gray-600">Chargement des entreprises...</p>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Liste vide -->
      <div v-else-if="entreprises.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
          </path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune entreprise disponible</h3>
        <p class="mt-1 text-sm text-gray-500">Il n'y a pas encore d'entreprises partenaires.</p>
      </div>

      <!-- Grille d'entreprises -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="entreprise in entreprises" :key="entreprise.id"
          class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">

          <!-- Header de la carte -->
          <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
            <h3 class="text-xl font-bold text-white">{{ entreprise.nom }}</h3>
            <a :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(entreprise.adresse)}`"
              target="_blank" class="text-yellow-50 text-sm mt-1 hover:text-white flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ entreprise.adresse }}
            </a>

          </div>

          <!-- Contenu -->
          <div class="p-6 space-y-4">

            <!-- Référent -->
            <div>
              <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Référent
              </h4>
              <p class="text-gray-900 font-medium">{{ entreprise.referentPrenom }} {{ entreprise.referentNom }}</p>

              <div class="mt-2 space-y-1">
                <a :href="`tel:${entreprise.referentTelephone}`"
                  class="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                    </path>
                  </svg>
                  {{ entreprise.referentTelephone }}
                </a>

                <a v-if="entreprise.referentEmail" :href="`mailto:${entreprise.referentEmail}`"
                  class="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                    </path>
                  </svg>
                  {{ entreprise.referentEmail }}
                </a>
              </div>
            </div>

            <!-- Employés -->
            <div v-if="entreprise.employes?.length > 0">
              <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                  </path>
                </svg>
                Employés ({{ entreprise.employes.length }})
              </h4>

              <div class="space-y-2">
                <div v-for="employe in entreprise.employes" :key="employe.id" class="bg-gray-50 rounded-md p-3">
                  <p class="text-sm font-medium text-gray-900">
                    {{ employe.prenom }} {{ employe.nom }}
                    <span v-if="employe.poste" class="text-gray-500 font-normal">- {{ employe.poste }}</span>
                  </p>
                  <div class="mt-1 space-y-1">
                    <a :href="`tel:${employe.telephone}`"
                      class="flex items-center text-xs text-blue-600 hover:text-blue-800">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                        </path>
                      </svg>
                      {{ employe.telephone }}
                    </a>
                    <a v-if="employe.email" :href="`mailto:${employe.email}`"
                      class="flex items-center text-xs text-blue-600 hover:text-blue-800">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                      </svg>
                      {{ employe.email }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Informations complémentaires -->
            <div v-if="entreprise.nombreRuches || entreprise.notes" class="pt-4 border-t">
              <div v-if="entreprise.nombreRuches" class="flex items-center text-sm text-gray-600 mb-2">
                <span class="mr-2">🐝</span>
                <span>{{ entreprise.nombreRuches }} ruches</span>
              </div>
              <p v-if="entreprise.notes" class="text-xs text-gray-500 italic">
                {{ entreprise.notes }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="px-6 py-4 bg-gray-50 border-t">
            <button @click="prendreRendezVous(entreprise)"
              class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md font-medium flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                </path>
              </svg>
              Prendre rendez-vous
            </button>
          </div>
          <RendezVousModal v-if="entrepriseSelectionnee" :is-open="isRdvModalOpen" :entreprise="entrepriseSelectionnee"
            @close="closeRdvModal" @rdv-created="onRdvCreated" />

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// definePageMeta({
//   middleware: 'auth'
// })

// États
const entreprises = ref([])
const loading = ref(true)
const error = ref('')

// Charger les entreprises au montage
onMounted(async () => {
  await chargerEntreprises()
})

// Fonction pour charger les entreprises
async function chargerEntreprises() {
  loading.value = true
  error.value = ''

  try {
    const response = await $fetch('http://localhost:3001/entreprises')

    if (response.success) {
      entreprises.value = response.entreprises
    } else {
      throw new Error('Erreur lors du chargement des entreprises')
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement des entreprises: ' + (err.message || 'Erreur inconnue')
    console.error('Erreur:', err)
  }

  loading.value = false
}

// Fonction de navigation
function retourDashboard() {
  navigateTo('/dashboard')
}

// Fonction pour prendre rendez-vous

const isRdvModalOpen = ref(false)
const entrepriseSelectionnee = ref(null)

function prendreRendezVous(entreprise) {
  entrepriseSelectionnee.value = entreprise
  isRdvModalOpen.value = true
}

function closeRdvModal() {
  isRdvModalOpen.value = false
  entrepriseSelectionnee.value = null
}

function onRdvCreated() {
  // RDV créé avec succès
  alert('Rendez-vous créé ! Vous recevrez une confirmation par email.')
}

</script>