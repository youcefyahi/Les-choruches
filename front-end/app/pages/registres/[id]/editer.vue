<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Modifier le registre</h1>
            <p class="mt-2 text-gray-600">Modifiez les informations de votre registre d'élevage</p>
          </div>
          <NuxtLink :to="`/registres/${registreId}`"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            ← Retour
          </NuxtLink>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div class="flex">
          <span class="text-red-400">⚠️</span>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Erreur</h3>
            <p class="mt-1 text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Formulaire d'édition -->
      <div v-else-if="registre" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <form @submit.prevent="updateRegistre" class="p-6 space-y-6">

          <!-- Informations du rucher -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Informations du rucher</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nom du rucher *
                </label>
                <input v-model="form.nomRucher" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: Rucher des Tilleuls" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Adresse du rucher *
                </label>
                <input v-model="form.adresseRucher" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Adresse complète" />
              </div>
            </div>
          </div>

          <!-- Identification de la ruche -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Identification de la ruche</h2>
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Identification de la ruche *
                </label>
                <input v-model="form.identificationRuche" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: R001" />
              </div>
            </div>
          </div>

          <!-- Informations sur la reine -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Informations sur la reine</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Race de la reine
                </label>
                <input v-model="form.race" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: Buckfast" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Origine
                </label>
                <input v-model="form.origine" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: Essaimage naturel" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Reine marquée
                </label>
                <div class="flex items-center space-x-4">
                  <label class="flex items-center">
                    <input v-model="form.marquee" :value="true" type="radio"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300" />
                    <span class="ml-2 text-sm text-gray-700">Oui</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="form.marquee" :value="false" type="radio"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300" />
                    <span class="ml-2 text-sm text-gray-700">Non</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex justify-between pt-6">
            <button type="button" @click="$router.back()"
              class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Annuler
            </button>

            <button type="submit" :disabled="isSubmitting"
              class="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Sauvegarde...
              </span>
              <span v-else>Sauvegarder les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()

// Récupérer l'ID du registre
const registreId = route.params.id 

// State
const isSubmitting = ref(false)
const error = ref(null)

// Récupération du registre
const { data: registre, pending } = await useFetch(`http://localhost:3001/registres/${registreId}`)

// Formulaire avec les champs exacts du modèle
const form = ref({
  nomRucher: '',
  adresseRucher: '',
  identificationRuche: '',
  race: '',
  marquee: false,
  origine: ''
})

// Initialiser le formulaire avec les données du registre
watchEffect(() => {
  if (registre.value) {
    Object.keys(form.value).forEach(key => {
      if (registre.value[key] !== undefined) {
        form.value[key] = registre.value[key] || ''
      }
    })
  }
})

// Fonction de mise à jour
async function updateRegistre() {
  if (isSubmitting.value) return

  isSubmitting.value = true
  error.value = null

  try {
    await $fetch(`http://localhost:3001/registres/${registreId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: form.value
    })

    // Redirection vers la page de détail
    await router.push(`/registres/${registreId}`)

  } catch (err) {
    console.error('Erreur lors de la mise à jour:', err)
    error.value = 'Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}
</script>