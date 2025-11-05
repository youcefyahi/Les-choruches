<template>
  <!-- Overlay de la modale -->
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
              </path>
            </svg>
            Calendrier Apicole - Actions Saisonnières
          </h2>
          <button @click="$emit('close')" class="text-white hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Stats globales -->
        <div class="flex items-center space-x-6 mt-3 text-green-100 text-sm">
          <span>Total: {{ totalActions }}</span>
          <span>Terminées: {{ completedActions }}</span>
          <span>À faire: {{ pendingActions }}</span>
        </div>
      </div>

      <!-- Onglets des saisons -->
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6">
          <button
            v-for="saison in saisons"
            :key="saison.key"
            @click="activeSaison = saison.key"
            class="py-4 px-2 border-b-2 font-medium text-sm transition-colors"
            :class="activeSaison === saison.key 
              ? 'border-green-500 text-green-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            <div class="flex items-center space-x-2">
              <span v-html="saison.icon"></span>
              <span>{{ saison.label }}</span>
              <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {{ getActionsBySaison(saison.key).length }}
              </span>
            </div>
          </button>
        </nav>
      </div>

      <!-- Filtres -->
      <div class="px-6 py-3 bg-gray-50 border-b">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Statut:</label>
            <select v-model="filterStatus" class="text-sm border rounded px-2 py-1">
              <option value="">Tous</option>
              <option value="a_faire">À faire</option>
              <option value="en_cours">En cours</option>
              <option value="terminee">Terminées</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Priorité:</label>
            <select v-model="filterPriority" class="text-sm border rounded px-2 py-1">
              <option value="">Toutes</option>
              <option value="haute">Haute</option>
              <option value="moyenne">Moyenne</option>
              <option value="basse">Basse</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Contenu scrollable -->
      <div class="overflow-y-auto" style="max-height: calc(90vh - 200px);">
        
        <!-- Loading -->
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3"></div>
          <p class="text-gray-600">Chargement des actions...</p>
        </div>

        <!-- Actions de la saison active -->
        <div v-else class="p-6">
          <div v-if="filteredActions.length === 0" class="text-center py-8">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <p class="text-gray-500 mb-2">Aucune action trouvée pour {{ getSaisonLabel(activeSaison) }}</p>
            <button 
              @click="generateStandardActions"
              class="text-green-600 hover:text-green-800 font-medium text-sm"
            >
              Générer les actions standard
            </button>
          </div>

          <!-- Grille des actions -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="action in filteredActions"
              :key="action.id"
              class="border rounded-lg p-4 hover:shadow-md transition-shadow"
              :class="getActionCardClass(action)"
            >
              <!-- Header de la card -->
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    :checked="action.status === 'terminee'"
                    @change="toggleActionStatus(action)"
                    class="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <h3 class="font-semibold text-gray-900">{{ action.titre }}</h3>
                </div>
                <span 
                  class="px-2 py-1 text-xs rounded-full"
                  :class="getPriorityBadgeClass(action.priorite)"
                >
                  {{ getPriorityLabel(action.priorite) }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-sm text-gray-600 mb-3">{{ action.description }}</p>

              <!-- Infos détaillées -->
              <div class="space-y-2 text-xs text-gray-500">
                <div class="flex items-center space-x-4">
                  <span>📅 {{ getMoisLabel(action.moisOptimal) }}</span>
                  <span v-if="action.dureeEstimee">⏱️ {{ action.dureeEstimee }}min</span>
                </div>
                
                <div v-if="action.materielNecessaire?.length" class="flex items-start space-x-1">
                  <span>🛠️</span>
                  <span>{{ action.materielNecessaire.join(', ') }}</span>
                </div>
                
                <div v-if="action.conseils" class="flex items-start space-x-1">
                  <span>💡</span>
                  <span>{{ action.conseils }}</span>
                </div>
              </div>

              <!-- Footer avec statut -->
              <div class="mt-3 pt-3 border-t flex items-center justify-between">
                <span 
                  class="px-2 py-1 text-xs rounded-full"
                  :class="getStatusClass(action.status)"
                >
                  {{ getStatusLabel(action.status) }}
                </span>
                
                <div class="flex items-center space-x-1">
                  <button 
                    v-if="action.status !== 'en_cours'"
                    @click="setActionStatus(action, 'en_cours')"
                    class="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Démarrer
                  </button>
                  <button 
                    v-if="action.status !== 'terminee'"
                    @click="setActionStatus(action, 'terminee')"
                    class="text-green-600 hover:text-green-800 text-xs"
                  >
                    Terminer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'actions-updated'])

// États
const loading = ref(false)
const activeSaison = ref('printemps')
const allActions = ref([])
const filterStatus = ref('')
const filterPriority = ref('')

// Définition des saisons
const saisons = [
  { 
    key: 'printemps', 
    label: 'Printemps', 
    icon: '🌱',
    mois: [3, 4, 5]
  },
  { 
    key: 'ete', 
    label: 'Été', 
    icon: '☀️',
    mois: [6, 7, 8]
  },
  { 
    key: 'automne', 
    label: 'Automne', 
    icon: '🍂',
    mois: [9, 10, 11]
  },
  { 
    key: 'hiver', 
    label: 'Hiver', 
    icon: '❄️',
    mois: [12, 1, 2]
  }
]

// Computed
const totalActions = computed(() => allActions.value.length)
const completedActions = computed(() => allActions.value.filter(a => a.status === 'terminee').length)
const pendingActions = computed(() => allActions.value.filter(a => a.status === 'a_faire').length)

const filteredActions = computed(() => {
  let actions = getActionsBySaison(activeSaison.value)
  
  if (filterStatus.value) {
    actions = actions.filter(a => a.status === filterStatus.value)
  }
  
  if (filterPriority.value) {
    actions = actions.filter(a => a.priorite === filterPriority.value)
  }
  
  return actions.sort((a, b) => a.moisOptimal - b.moisOptimal)
})

// Watchers
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    loadAllActions()
  }
})

// Méthodes
async function loadAllActions() {
  try {
    loading.value = true
    const userData = localStorage.getItem('user')
    if (!userData) return
    
    const user = JSON.parse(userData)
    const response = await $fetch(`http://localhost:3001/actions-saisonnieres/apiculteur/${user.id}`)
    
    if (response.success) {
      allActions.value = response.actions
    }
  } catch (error) {
    console.error('Erreur chargement actions:', error)
  } finally {
    loading.value = false
  }
}

function getActionsBySaison(saison) {
  return allActions.value.filter(action => action.saison === saison)
}

function getSaisonLabel(saison) {
  return saisons.find(s => s.key === saison)?.label || saison
}

function getMoisLabel(moisNum) {
  const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
  return mois[moisNum - 1] || moisNum
}

function getActionCardClass(action) {
  if (action.status === 'terminee') return 'bg-green-50 border-green-200'
  if (action.status === 'en_cours') return 'bg-blue-50 border-blue-200'
  return 'bg-white border-gray-200'
}

function getPriorityBadgeClass(priorite) {
  switch (priorite) {
    case 'haute': return 'bg-red-100 text-red-800'
    case 'moyenne': return 'bg-orange-100 text-orange-800'
    case 'basse': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getPriorityLabel(priorite) {
  switch (priorite) {
    case 'haute': return 'Haute'
    case 'moyenne': return 'Moyenne'
    case 'basse': return 'Basse'
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
  await setActionStatus(action, newStatus)
}

async function setActionStatus(action, newStatus) {
  try {
    const response = await $fetch(`http://localhost:3001/actions-saisonnieres/${action.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: { status: newStatus }
    })
    
    if (response.success) {
      // Mettre à jour localement
      const actionIndex = allActions.value.findIndex(a => a.id === action.id)
      if (actionIndex !== -1) {
        allActions.value[actionIndex].status = newStatus
        if (newStatus === 'terminee') {
          allActions.value[actionIndex].dateCompletion = new Date()
        }
      }
      
      emit('actions-updated')
    }
  } catch (error) {
    console.error('Erreur mise à jour action:', error)
  }
}

async function generateStandardActions() {
  try {
    const userData = localStorage.getItem('user')
    if (!userData) return
    
    const user = JSON.parse(userData)
    const response = await $fetch(`http://localhost:3001/actions-saisonnieres/generate-standard/${user.id}`, {
      method: 'POST'
    })
    
    if (response.success) {
      await loadAllActions()
    }
  } catch (error) {
    console.error('Erreur génération actions:', error)
  }
}
</script>