<template>
  <div @click="navigateTo('/registres')"
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
</template>

<script setup>
// Pas de logique nécessaire, juste navigation
</script>