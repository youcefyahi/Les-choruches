<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center space-x-4">
          <button @click="retourListe" class="text-gray-500 hover:text-gray-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h1 class="text-2xl font-bold text-gray-900">Nouvelle Entreprise</h1>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <form @submit.prevent="handleSubmit" class="bg-white shadow-lg rounded-lg p-6 space-y-6">

        <!-- Informations de l'entreprise -->
        <div class="border-b pb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations de l'entreprise</h2>

          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom de l'entreprise *</label>
              <input v-model="formData.nom" type="text" required
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Adresse *</label>
              <input v-model="formData.adresse" type="text" required
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Nombre de ruches</label>
              <input v-model.number="formData.nombreRuches" type="number" min="0"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Notes</label>
              <textarea v-model="formData.notes" rows="3"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"></textarea>
            </div>
          </div>
        </div>

        <!-- Référent de l'entreprise -->
        <div class="border-b pb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Référent de l'entreprise</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Prénom *</label>
              <input v-model="formData.referentPrenom" type="text" required
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Nom *</label>
              <input v-model="formData.referentNom" type="text" required
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Téléphone *</label>
              <input v-model="formData.referentTelephone" type="tel" required
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="formData.referentEmail" type="email"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
          </div>
        </div>

        <!-- Employés -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Employés</h2>
            <button type="button" @click="ajouterEmploye"
              class="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Ajouter un employé
            </button>
          </div>

          <div v-if="formData.employes.length === 0" class="text-center py-6 text-gray-500 bg-gray-50 rounded-md">
            <p class="text-sm">Aucun employé ajouté</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="(employe, index) in formData.employes" :key="index"
              class="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-sm font-medium text-gray-700">Employé {{ index + 1 }}</h3>
                <button type="button" @click="retirerEmploye(index)" class="text-red-600 hover:text-red-800 text-sm">
                  Retirer
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-600">Prénom</label>
                  <input v-model="employe.prenom" type="text" required
                    class="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-gray-600">Nom</label>
                  <input v-model="employe.nom" type="text" required
                    class="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-gray-600">Téléphone</label>
                  <input v-model="employe.telephone" type="tel" required
                    class="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                </div>

                <div>
                  <label class="block text-xs font-medium text-gray-600">Email</label>
                  <input v-model="employe.email" type="email"
                    class="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-xs font-medium text-gray-600">Poste</label>
                  <input v-model="employe.poste" type="text"
                    class="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message d'erreur -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
          {{ error }}
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="retourListe"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Annuler
          </button>
          <button type="submit" :disabled="isSubmitting"
            class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50">
            {{ isSubmitting ? 'Création...' : 'Créer l\'entreprise' }}
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const { getToken } = useAuth()

definePageMeta({
  middleware: 'admin'
})

const formData = ref({
  nom: '',
  adresse: '',
  referentPrenom: '',
  referentNom: '',
  referentTelephone: '',
  referentEmail: '',
  nombreRuches: null,
  notes: '',
  employes: []
})

const error = ref('')
const isSubmitting = ref(false)

function ajouterEmploye() {
  formData.value.employes.push({
    id: Date.now().toString(),
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    poste: '',
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

function retirerEmploye(index) {
  formData.value.employes.splice(index, 1)
}

async function handleSubmit() {
  error.value = ''
  isSubmitting.value = true

  try {
    const response = await $fetch('http://localhost:3001/entreprises', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(formData.value)
    })

    if (response.success) {
      navigateTo('/admin/entreprises')
    }
  } catch (err) {
    console.error('Erreur:', err)
    error.value = 'Erreur lors de la création de l\'entreprise: ' + (err.message || 'Erreur inconnue')
  } finally {
    isSubmitting.value = false
  }
}

function retourListe() {
  navigateTo('/admin/entreprises')
}
</script>