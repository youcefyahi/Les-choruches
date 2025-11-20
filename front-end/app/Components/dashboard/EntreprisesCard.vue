<template>
  <div @click="navigateTo('/entreprises')"
    class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 border-l-4 border-blue-500">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Entreprises</h3>
        <p class="text-sm text-gray-600 mt-1">Consulter les entreprises partenaires</p>
      </div>
      <div class="bg-blue-100 p-3 rounded-full">
        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
          </path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pas de logique nécessaire, juste navigation
</script>