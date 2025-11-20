<template>
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
      <RegistresCard />
      <EntreprisesCard />
      <TraitementsCard />
      <RecoltesCard />
      <ComptesRendusCard />
    </div>

    <!-- Modale des actions saisonnières -->
    <ActionsSaisonnieresModal :is-open="isModalOpen" @close="closeModal" @actions-updated="loadActionsCurrentMonth" />

    <!-- Modale Guide Photos -->
    <GuidePhotosModal :is-open="isGuidePhotosOpen" :action-titre="'Guide Général'" @close="closeGuidePhotos" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { actionsSaisonnieresService } from '~/services/actionsSaisonnieres.service'

const { user, getUserId } = useAuth()

const actionsCurrentMonth = ref([])
const loadingActions = ref(false)
const isModalOpen = ref(false)
const isGuidePhotosOpen = ref(false)

/**
 * Charge les actions du mois en cours
 */
async function loadActionsCurrentMonth() {
  try {
    loadingActions.value = true
    const userId = getUserId()
    if (!userId) return

    actionsCurrentMonth.value = await actionsSaisonnieresService.getCurrentMonthActions(userId)
  } catch (error) {
    console.error('Erreur lors du chargement des actions:', error)
  } finally {
    loadingActions.value = false
  }
}

/**
 * Met à jour le statut d'une action
 */
async function updateActionStatus({ actionId, status }) {
  try {
    const success = await actionsSaisonnieresService.updateActionStatus(actionId, status)
    
    if (success) {
      await loadActionsCurrentMonth()
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  }
}

// Gestion des modales
function openSaisonModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function openGuidePhotos() {
  isGuidePhotosOpen.value = true
}

function closeGuidePhotos() {
  isGuidePhotosOpen.value = false
}

onMounted(async () => {
  await loadActionsCurrentMonth()
})
</script>