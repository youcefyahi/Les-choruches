<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
      <!-- Header -->
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Administration
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Connexion à l'espace administrateur
        </p>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="admin@example.com"
          />
        </div>

        <!-- Mot de passe -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="••••••••"
          />
        </div>

        <!-- Message d'erreur -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
          {{ error }}
        </div>

        <!-- Bouton de connexion -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isSubmitting">Se connecter</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion en cours...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const formData = ref({
  email: '',
  password: ''
})

const error = ref('')
const isSubmitting = ref(false)

async function handleLogin() {
  error.value = ''
  isSubmitting.value = true

  try {
    const response = await $fetch('http://localhost:3001/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.value.email,
        password: formData.value.password
      })
    })

    // Stocker les informations de l'admin
    localStorage.setItem('adminToken', response.token)
    localStorage.setItem('admin', JSON.stringify({
      uid: response.uid,
      email: response.email,
      firstName: response.admin.firstName,
      lastName: response.admin.lastName,
      role: 'admin'
    }))

    // Rediriger vers le dashboard admin
    navigateTo('/admin/dashboard')

  } catch (err) {
    console.error('Erreur de connexion:', err)
    error.value = 'Email ou mot de passe incorrect'
  } finally {
    isSubmitting.value = false
  }
}
</script>