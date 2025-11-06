<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center">
        <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 4v6m4-6v6m-8-6v6">
          </path>
        </svg>
        Cahier des Charges
      </h3>
      <button 
        @click="openModal" 
        class="text-sm text-purple-600 hover:text-purple-800 font-medium"
      >
        Consulter
      </button>
    </div>

    <!-- Aperçu des statuts -->
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div class="text-center p-3 bg-green-50 rounded-lg">
        <div class="text-2xl font-bold text-green-600">85%</div>
        <div class="text-xs text-green-700">Conformité</div>
      </div>
      <div class="text-center p-3 bg-orange-50 rounded-lg">
        <div class="text-2xl font-bold text-orange-600">3</div>
        <div class="text-xs text-orange-700">À vérifier</div>
      </div>
      <div class="text-center p-3 bg-red-50 rounded-lg">
        <div class="text-2xl font-bold text-red-600">1</div>
        <div class="text-xs text-red-700">Non conforme</div>
      </div>
    </div>

    <!-- Prochaines échéances -->
    <div class="border-t pt-4">
      <h4 class="text-sm font-medium text-gray-900 mb-2">Prochaines échéances</h4>
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-600">Rapport mensuel</span>
          <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">15 déc</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-600">Contrôle qualité</span>
          <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">22 déc</span>
        </div>
      </div>
    </div>

    <!-- Modale intégrée -->
    <CahierChargesModal 
      :is-open="isModalOpen" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
// État local de la modale
const isModalOpen = ref(false)

// Fonctions locales
function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}
</script>