<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Les Échoruches</h1>
          <button @click="logout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
            Déconnexion
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Welcome Message -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          Bienvenue {{ user?.firstName }} !
        </h2>
        <p class="text-gray-600">
          Gérez votre rucher en toute simplicité.
        </p>
      </div>

      <!-- Actions du mois -->
      <ActionsDuMois :actions="actionsCurrentMonth" :loading="loadingActions" @open-modal="openSaisonModal"
        @action-updated="updateActionStatus" @open-guide-photos="openGuidePhotos" />

      <CahierChargesCard @open-cahier-charges="openCahierCharges" />

      <!-- Modules -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Module 1: Registres -->
        <div @click="allerAuxRegistres"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="text-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Registres</h3>
            <p class="text-sm text-gray-500">Gérer vos registres d'élevage</p>
          </div>
        </div>

        <!-- Card Entreprises -->
        <div @click="goToEntreprises"
          class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Entreprises</h3>
              <p class="text-sm text-gray-600 mt-1">Consulter les entreprises partenaires</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                </path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Module 2: Traitements -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer opacity-60">
          <div class="text-center">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z">
                </path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Traitements</h3>
            <p class="text-sm text-gray-500">Suivi des traitements</p>
            <span class="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded mt-2">Bientôt</span>
          </div>
        </div>

        <!-- Module 3: Récoltes -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer opacity-60">
          <div class="text-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Récoltes</h3>
            <p class="text-sm text-gray-500">Suivi de production</p>
            <span class="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded mt-2">Bientôt</span>
          </div>
        </div>

        <!-- Nouveau module Comptes Rendus -->
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          @click="navigateTo('/comptes-rendus')">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-800">Comptes Rendus</h3>
                <p class="text-sm text-gray-600">Interventions et observations</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-purple-600" id="comptes-rendus-count">-</div>
              <div class="text-xs text-gray-500">Total</div>
            </div>
          </div>
          <div class="flex items-center text-sm text-gray-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
            Gérer vos comptes rendus d'intervention
          </div>
        </div>
      </div>
    </main>

    <!-- Modale des actions saisonnières -->
    <ActionsSaisonnieresModal :is-open="isModalOpen" @close="closeModal" @actions-updated="loadActionsCurrentMonth" />

    <!-- Modale Guide Photos -->
    <GuidePhotosModal :is-open="isGuidePhotosOpen" :action-titre="'Guide Général'" @close="closeGuidePhotos" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// ✅ NOUVEAU : Utilise le composable useAuth
const { user, logout: authLogout, getUserId, getToken } = useAuth()

// Données pour les actions
const actionsCurrentMonth = ref([])
const loadingActions = ref(false)

// Données pour les modales
const isModalOpen = ref(false)
const isGuidePhotosOpen = ref(false)

// ✅ NOUVEAU : Fonction corrigée avec useAuth
const loadComptesRendusCount = async () => {
  try {
    const userId = getUserId() // ← Utilise getUserId() au lieu de useState('user')
    const token = getToken()   // ← Utilise getToken() pour l'auth

    const response = await $fetch(`http://localhost:3001/comptes-rendus/apiculteur/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    document.getElementById('comptes-rendus-count').textContent = response.comptes_rendus.length
  } catch (error) {
    console.error('Erreur chargement comptes rendus:', error)
    document.getElementById('comptes-rendus-count').textContent = '0'
  }
}

// ✅ NOUVEAU : Déconnexion avec composable
function logout() {
  authLogout() // ← Utilise la fonction du composable
  navigateTo('/connexion') // ← Ou '/login' selon ton fichier
}

// ✅ NOUVEAU : Fonction corrigée avec useAuth
async function loadActionsCurrentMonth() {
  try {
    loadingActions.value = true
    const userId = getUserId() // ← Utilise getUserId() au lieu de localStorage
    if (!userId) return

    const response = await $fetch(`http://localhost:3001/actions-saisonnieres/apiculteur/${userId}/current-month`)

    if (response.success) {
      actionsCurrentMonth.value = response.actions
    }
  } catch (error) {
    console.error('Erreur chargement actions:', error)
  } finally {
    loadingActions.value = false
  }
}

// Navigation
function goToEntreprises() {
  navigateTo('/entreprises')
}

function allerAuxRegistres() {
  navigateTo('/registres')
}

// Fonctions modale actions saisonnières
function openSaisonModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

// Fonctions modale guide photos
function openGuidePhotos() {
  isGuidePhotosOpen.value = true
}

function closeGuidePhotos() {
  isGuidePhotosOpen.value = false
}

// Mettre à jour le statut d'une action
async function updateActionStatus({ actionId, status }) {
  try {
    const response = await $fetch(`http://localhost:3001/actions-saisonnieres/${actionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: { status }
    })

    if (response.success) {
      await loadActionsCurrentMonth()
    }
  } catch (error) {
    console.error('Erreur mise à jour action:', error)
  }
}

// ✅ NOUVEAU : Plus besoin de charger depuis localStorage
onMounted(async () => {
  await loadActionsCurrentMonth()
  await loadComptesRendusCount()
})

// ✅ SUPPRIMÉ temporairement - corrige d'abord le middleware
// definePageMeta({
//   middleware: 'auth'
// })
</script>