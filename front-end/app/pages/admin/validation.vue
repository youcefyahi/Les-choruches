<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Validation des Comptes Rendus</h1>

      <div v-if="comptesRendus.length === 0" class="text-center text-gray-500 py-12">
        Aucun compte rendu en attente de validation
      </div>

      <div v-else class="space-y-6">
        <div v-for="cr in comptesRendus" :key="cr.id"
          class="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          
          <!-- En-tête -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">
                {{ new Date(cr.date).toLocaleDateString('fr-FR') }}
              </h2>
              <p class="text-sm text-gray-500">
                Apiculteur ID: {{ cr.apiculteur_id }}
              </p>
            </div>
            <span class="px-3 py-1 bg-yellow-200 text-yellow-800 text-sm rounded-full">
              ⏳ En attente
            </span>
          </div>

          <!-- Observations -->
          <div class="mb-4">
            <h3 class="font-medium text-gray-700 mb-2">Observations :</h3>
            <div v-if="cr.observations_type === 'audio'" class="text-gray-600">
              🎤 Enregistrement audio
              <audio v-if="cr.observations_audio_url" :src="cr.observations_audio_url" controls class="w-full mt-2"></audio>
            </div>
            <p v-else class="text-gray-600">{{ cr.observations_texte }}</p>
          </div>

          <!-- Médias -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-600">
                📷 <strong>{{ cr.photos?.length || 0 }}</strong> photos
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-600">
                🎥 <strong>{{ cr.videos?.length || 0 }}</strong> vidéos
              </p>
            </div>
          </div>

          <!-- Personnel présent -->
          <div v-if="cr.personnel_present?.length > 0" class="mb-4">
            <h3 class="font-medium text-gray-700 mb-2">Personnel présent :</h3>
            <ul class="text-sm text-gray-600">
              <li v-for="(personne, idx) in cr.personnel_present" :key="idx">
                {{ personne.nom }} <span v-if="personne.role" class="text-gray-500">({{ personne.role }})</span>
              </li>
            </ul>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-4 border-t">
            <button @click="valider(cr.id)"
              class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              ✅ Valider
            </button>
            <button @click="ouvrirRejet(cr.id)"
              class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              ❌ Rejeter
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de rejet -->
    <div v-if="isRejetModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Motif du rejet</h2>
        
        <textarea v-model="motifRejet" rows="4" placeholder="Expliquez pourquoi vous rejetez ce compte rendu..."
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4">
        </textarea>

        <div class="flex gap-3">
          <button @click="fermerRejet"
            class="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            Annuler
          </button>
          <button @click="confirmerRejet"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Rejeter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getToken } = useAuth()

const comptesRendus = ref([])
const isRejetModalOpen = ref(false)
const compteRenduIdRejet = ref(null)
const motifRejet = ref('')

const loadComptesRendus = async () => {
  try {
    const response = await $fetch('http://localhost:3001/comptes-rendus/en-attente', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    comptesRendus.value = response.comptes_rendus
  } catch (error) {
    console.error('Erreur chargement:', error)
    alert('Erreur lors du chargement')
  }
}

const valider = async (id) => {
  if (!confirm('Valider ce compte rendu ?')) return

  try {
    await $fetch(`http://localhost:3001/comptes-rendus/${id}/valider`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    alert('Compte rendu validé !')
    await loadComptesRendus()
  } catch (error) {
    console.error('Erreur validation:', error)
    alert('Erreur lors de la validation')
  }
}

const ouvrirRejet = (id) => {
  compteRenduIdRejet.value = id
  motifRejet.value = ''
  isRejetModalOpen.value = true
}

const fermerRejet = () => {
  compteRenduIdRejet.value = null
  motifRejet.value = ''
  isRejetModalOpen.value = false
}

const confirmerRejet = async () => {
  if (!motifRejet.value.trim()) {
    alert('Veuillez indiquer un motif de rejet')
    return
  }

  try {
    await $fetch(`http://localhost:3001/comptes-rendus/${compteRenduIdRejet.value}/rejeter`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: {
        motif: motifRejet.value
      }
    })
    alert('Compte rendu rejeté')
    fermerRejet()
    await loadComptesRendus()
  } catch (error) {
    console.error('Erreur rejet:', error)
    alert('Erreur lors du rejet')
  }
}

onMounted(() => {
  loadComptesRendus()
})
</script>