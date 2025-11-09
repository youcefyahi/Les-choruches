<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2 text-center">📋 Mur des Comptes Rendus</h1>
      <p class="text-gray-600 text-center mb-8">Tous les comptes rendus validés par l'équipe</p>

      <div v-if="comptesRendus.length === 0" class="text-center text-gray-500 py-12 bg-white rounded-lg shadow">
        Aucun compte rendu validé pour le moment
      </div>

      <div v-else class="space-y-6">
        <div v-for="cr in comptesRendus" :key="cr.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          
          <!-- En-tête du post -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  🐝
                </div>
                <div>
                  <p class="font-semibold text-gray-800">Apiculteur</p>
                  <p class="text-sm text-gray-500">
                    {{ new Date(cr.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    }) }}
                  </p>
                </div>
              </div>
              <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                ✅ Validé
              </span>
            </div>
          </div>

          <!-- Contenu -->
          <div class="p-6">
            <!-- Observations texte -->
            <div v-if="cr.observations_type === 'texte' && cr.observations_texte" class="mb-4">
              <p class="text-gray-700 whitespace-pre-wrap">{{ cr.observations_texte }}</p>
            </div>

            <!-- Observations audio -->
            <div v-if="cr.observations_type === 'audio' && cr.observations_audio_url" class="mb-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 mb-2">🎤 Enregistrement audio</p>
                <audio :src="cr.observations_audio_url" controls class="w-full"></audio>
              </div>
            </div>

            <!-- Photos -->
            <div v-if="cr.photos?.length > 0" class="mb-4">
              <div class="grid gap-2" :class="{
                'grid-cols-1': cr.photos.length === 1,
                'grid-cols-2': cr.photos.length === 2,
                'grid-cols-3': cr.photos.length >= 3
              }">
                <img v-for="(photo, idx) in cr.photos.slice(0, 6)" :key="idx"
                  :src="photo.url"
                  :alt="photo.nom_fichier"
                  class="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90"
                  @click="openImage(photo.url)">
              </div>
              <p v-if="cr.photos.length > 6" class="text-sm text-gray-500 mt-2">
                + {{ cr.photos.length - 6 }} photos supplémentaires
              </p>
            </div>

            <!-- Vidéos -->
            <div v-if="cr.videos?.length > 0" class="mb-4">
              <div class="grid gap-2" :class="{
                'grid-cols-1': cr.videos.length === 1,
                'grid-cols-2': cr.videos.length >= 2
              }">
                <video v-for="(video, idx) in cr.videos.slice(0, 4)" :key="idx"
                  :src="video.url"
                  controls
                  class="w-full rounded-lg">
                </video>
              </div>
              <p v-if="cr.videos.length > 4" class="text-sm text-gray-500 mt-2">
                + {{ cr.videos.length - 4 }} vidéos supplémentaires
              </p>
            </div>

            <!-- Personnel présent -->
            <div v-if="cr.personnel_present?.length > 0" class="mt-4 pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-600">
                <strong>Personnel présent :</strong>
                <span v-for="(personne, idx) in cr.personnel_present" :key="idx">
                  {{ personne.nom }}<span v-if="personne.role"> ({{ personne.role }})</span><span v-if="idx < cr.personnel_present.length - 1">, </span>
                </span>
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center gap-4 text-sm text-gray-600">
            <span>📷 {{ cr.photos?.length || 0 }} photos</span>
            <span>🎥 {{ cr.videos?.length || 0 }} vidéos</span>
            <span class="ml-auto">
              Validé le {{ new Date(cr.date_validation).toLocaleDateString('fr-FR') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal image -->
    <div v-if="selectedImage" @click="closeImage"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <img :src="selectedImage" alt="Image agrandie" class="max-w-full max-h-full rounded-lg">
    </div>
  </div>
</template>

<script setup>
const { getToken } = useAuth()

const comptesRendus = ref([])
const selectedImage = ref(null)

const loadMur = async () => {
  try {
    const response = await $fetch('http://localhost:3001/mur', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    comptesRendus.value = response.comptes_rendus
  } catch (error) {
    console.error('Erreur chargement mur:', error)
    alert('Erreur lors du chargement du mur')
  }
}

const openImage = (url) => {
  selectedImage.value = url
}

const closeImage = () => {
  selectedImage.value = null
}

onMounted(() => {
  loadMur()
})
</script>