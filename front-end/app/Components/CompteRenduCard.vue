<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">{{ compteRendu.date }}</h3>
        <p class="text-sm text-gray-500">{{ formatDate(compteRendu.date) }}</p>
      </div>
      <div class="flex space-x-2">
        <button 
          @click="$emit('edit', compteRendu)"
          class="text-blue-600 hover:text-blue-800 p-1">
          ✏️
        </button>
        <button 
          @click="$emit('delete', compteRendu.id)"
          class="text-red-600 hover:text-red-800 p-1">
          🗑️
        </button>
      </div>
    </div>

    <div class="space-y-3">
      <!-- Observations -->
      <div v-if="compteRendu.observations_texte || compteRendu.observations_audio_url">
        <h4 class="font-medium text-gray-700 mb-1">Observations</h4>
        <div v-if="compteRendu.observations_type === 'texte' && compteRendu.observations_texte" 
             class="text-gray-600 text-sm bg-gray-50 p-2 rounded">
          {{ compteRendu.observations_texte.substring(0, 100) }}{{ compteRendu.observations_texte.length > 100 ? '...' : '' }}
        </div>
        <div v-if="compteRendu.observations_type === 'audio' && compteRendu.observations_audio_url" 
             class="flex items-center text-sm text-gray-600">
          🎵 Enregistrement audio disponible
        </div>
      </div>

      <!-- Photos -->
      <div v-if="compteRendu.photos && compteRendu.photos.length > 0">
        <h4 class="font-medium text-gray-700 mb-1">Photos</h4>
        <div class="flex space-x-1">
          <div v-for="(photo, index) in compteRendu.photos.slice(0, 3)" :key="index"
               class="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs">
            📷
          </div>
          <div v-if="compteRendu.photos.length > 3" 
               class="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500">
            +{{ compteRendu.photos.length - 3 }}
          </div>
        </div>
      </div>

      <!-- Vidéos -->
      <div v-if="compteRendu.videos && compteRendu.videos.length > 0">
        <h4 class="font-medium text-gray-700 mb-1">Vidéos</h4>
        <div class="text-sm text-gray-600">
          🎥 {{ compteRendu.videos.length }} vidéo(s)
        </div>
      </div>

      <!-- Personnel présent -->
      <div v-if="compteRendu.personnel_present && compteRendu.personnel_present.length > 0">
        <h4 class="font-medium text-gray-700 mb-1">Personnel présent</h4>
        <div class="flex flex-wrap gap-1">
          <span v-for="personne in compteRendu.personnel_present" :key="personne.nom"
                class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {{ personne.nom }}{{ personne.role ? ` (${personne.role})` : '' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  compteRendu: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>