<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Actions du mois
      </h3>
      <button @click="$emit('open-modal')" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
        Voir le calendrier annuel
      </button>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Actions du mois
      </h3>

      <!-- LES DEUX BOUTONS CÔTE À CÔTE -->
      <div class="flex space-x-3">
        <button @click="$emit('open-modal')" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Voir le calendrier annuel
        </button>
        <button @click="$emit('open-guide-photos')"
          class="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
          📸 Guide Photos
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-4">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
      <p class="text-sm text-gray-500 mt-2">Chargement des actions...</p>
    </div>

    <!-- Actions du mois -->
    <div v-else-if="actions.length > 0" class="space-y-3">
      <div v-for="action in actions" :key="action.id"
        class="flex items-center justify-between p-3 rounded-lg border-l-4" :class="getPriorityClass(action.priorite)">
        <div class="flex items-center space-x-3">
          <input type="checkbox" :checked="action.status === 'terminee'" @change="toggleActionStatus(action)"
            class="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
          <div>
            <h4 class="font-medium text-gray-900">{{ action.titre }}</h4>
            <p class="text-sm text-gray-600">{{ action.description }}</p>
            <div class="flex items-center mt-1 space-x-4">
              <span class="text-xs text-gray-500">
                {{ getPriorityLabel(action.priorite) }}
              </span>
              <span v-if="action.dureeEstimee" class="text-xs text-gray-500">
                {{ action.dureeEstimee }}min
              </span>
            </div>
          </div>
        </div>

        <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(action.status)">
          {{ getStatusLabel(action.status) }}
        </span>
      </div>
    </div>

    <!-- Aucune action -->
    <div v-else class="text-center py-6">
      <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
        </path>
      </svg>
      <p class="text-gray-500">Aucune action prévue ce mois-ci</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  actions: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['open-modal', 'action-updated', 'open-guide-photos'])

// Couleurs selon la priorité
function getPriorityClass(priorite) {
  switch (priorite) {
    case 'haute': return 'border-red-500 bg-red-50'
    case 'moyenne': return 'border-orange-500 bg-orange-50'
    case 'basse': return 'border-green-500 bg-green-50'
    default: return 'border-gray-500 bg-gray-50'
  }
}

function getPriorityLabel(priorite) {
  switch (priorite) {
    case 'haute': return 'Priorité haute'
    case 'moyenne': return 'Priorité moyenne'
    case 'basse': return 'Priorité basse'
    default: return 'Non définie'
  }
}

function getStatusClass(status) {
  switch (status) {
    case 'terminee': return 'bg-green-100 text-green-800'
    case 'en_cours': return 'bg-blue-100 text-blue-800'
    case 'a_faire': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getStatusLabel(status) {
  switch (status) {
    case 'terminee': return 'Terminée'
    case 'en_cours': return 'En cours'
    case 'a_faire': return 'À faire'
    default: return 'Inconnu'
  }
}

async function toggleActionStatus(action) {
  const newStatus = action.status === 'terminee' ? 'a_faire' : 'terminee'
  emit('action-updated', { actionId: action.id, status: newStatus })
}
</script>