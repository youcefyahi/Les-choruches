<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Les Échoruches
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Connexion à votre compte
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input id="email" v-model="form.email" type="email" required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="votre@email.com" />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div class="mt-1">
              <input id="password" v-model="form.password" type="password" required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Votre mot de passe" />
            </div>
          </div>

          <!-- Message d'erreur -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {{ error }}
          </div>

          <!-- Message de succès -->
          <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
            {{ success }}
          </div>

          <!-- Bouton -->
          <div>
            <button type="submit" :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              <span v-if="loading">Connexion en cours...</span>
              <span v-else>Se connecter</span>
            </button>
          </div>

          <!-- Liens -->
          <div class="text-center space-y-2">
            <div>
              <NuxtLink to="/" class="text-sm text-indigo-600 hover:text-indigo-500">
                Pas encore de compte ? S'inscrire
              </NuxtLink>
            </div>
            <div>
              <a href="#" class="text-sm text-gray-500 hover:text-gray-700">
                Mot de passe oublié ?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginCredentials } from '~/types'

// ✅ NOUVEAU : Utilise le composable
const { login } = useAuth()

// ✅ Données du formulaire typées
const form = ref<LoginCredentials>({
  email: '',
  password: ''
})

// États
const loading = ref(false)
const error = ref('')
const success = ref('')

// ✅ NOUVEAU : Fonction de connexion simplifiée
async function handleSubmit() {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // ✅ Utilise le composable - plus de $fetch manuel !
    await login(form.value)
    
    success.value = 'Connexion réussie !'
    
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 1000)

  } catch (err) {
    error.value = 'Email ou mot de passe incorrect'
    console.error('Erreur:', err)
  }

  loading.value = false
}
</script>