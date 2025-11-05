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
            <h1 class="text-3xl font-bold text-gray-900">Gestion des Entreprises</h1>
          </div>
          <button @click="nouvelleEntreprise"
            class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Nouvelle Entreprise</span>
          </button>
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
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune entreprise</h3>
        <p class="mt-1 text-sm text-gray-500">Commencez par créer votre première entreprise.</p>
        <div class="mt-6">
          <button @click="nouvelleEntreprise"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Créer une entreprise
          </button>
        </div>
      </div>

      <!-- Liste des entreprises -->
      <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul class="divide-y divide-gray-200">
          <li v-for="entreprise in entreprises" :key="entreprise.id"
            class="hover:bg-gray-50 transition-colors">
            <div class="px-6 py-5">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900">{{ entreprise.nom }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ entreprise.adresse }}</p>
                  
                  <div class="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      {{ entreprise.referentPrenom }} {{ entreprise.referentNom }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                        </path>
                      </svg>
                      {{ entreprise.referentTelephone }}
                    </span>
                    <span v-if="entreprise.nombreRuches" class="flex items-center">
                      🐝 {{ entreprise.nombreRuches }} ruches
                    </span>
                  </div>
                  
                  <!-- Employés -->
                  <div v-if="entreprise.employes?.length > 0" class="mt-3">
                    <p class="text-xs text-gray-500 font-medium">Employés ({{ entreprise.employes.length }}) :</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                      <span v-for="employe in entreprise.employes.slice(0, 3)" :key="employe.id"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        {{ employe.prenom }} {{ employe.nom }}
                      </span>
                      <span v-if="entreprise.employes.length > 3" class="text-xs text-gray-500">
                        +{{ entreprise.employes.length - 3 }} autres
                      </span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center space-x-2 ml-4">
                  <button @click.stop="editerEntreprise(entreprise.id)"
                    class="text-yellow-600 hover:text-yellow-800 px-3 py-2 rounded-md border border-yellow-600 hover:bg-yellow-50">
                    Modifier
                  </button>
                  <button @click.stop="supprimerEntreprise(entreprise.id)"
                    class="text-red-600 hover:text-red-800 px-3 py-2 rounded-md border border-red-600 hover:bg-red-50">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth'
})

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

// Fonctions de navigation
function retourDashboard() {
  navigateTo('/admin/dashboard')
}

function nouvelleEntreprise() {
  navigateTo('/admin/entreprises/nouveau')
}

function editerEntreprise(id) {
  navigateTo(`/admin/entreprises/${id}/editer`)
}

// Fonction pour supprimer une entreprise
async function supprimerEntreprise(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
    return
  }

  try {
    await $fetch(`http://localhost:3001/entreprises/${id}`, {
      method: 'DELETE'
    })

    await chargerEntreprises()
  } catch (err) {
    alert('Erreur lors de la suppression: ' + err.message)
  }
}
</script>