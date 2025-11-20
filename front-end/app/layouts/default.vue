<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header global -->
    <header class="bg-white shadow">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <h1 @click="navigateTo('/dashboard')" class="text-2xl font-bold text-gray-900 cursor-pointer">
            Les Échoruches
          </h1>

          <div class="flex items-center space-x-3">
            <button @click="navigateTo('/parametres')"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Paramètres
            </button>
            <button @click="logout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu des pages -->
    <slot />
  </div>
</template>

<script setup>
const { logout: authLogout } = useAuth()

function logout() {
  authLogout()
  navigateTo('/connexion')
}
</script>