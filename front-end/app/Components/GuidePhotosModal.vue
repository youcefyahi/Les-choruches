<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
    <div class="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white flex items-center">
            📸 Guide Photos - {{ actionTitre || 'Documentation Apicole' }}
          </h2>
          <button @click="$emit('close')" class="text-white hover:text-gray-200 text-2xl">
            ✕
          </button>
        </div>
        <p class="text-blue-100 text-sm mt-2">
          Suggestions de photos pour documenter votre intervention
        </p>
      </div>

      <!-- Contenu -->
      <div class="overflow-y-auto p-6" style="max-height: calc(90vh - 120px);">
        
        <div class="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h3 class="font-semibold text-blue-900 mb-2">Action : {{ actionTitre }}</h3>
          <p class="text-blue-700 text-sm">
            Voici les photos recommandées pour documenter cette intervention
          </p>
        </div>

        <!-- Grid des suggestions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Suggestion 1 -->
          <div class="border rounded-lg p-5 hover:shadow-md bg-white">
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-semibold text-gray-900 text-lg">Vue d'ensemble de la ruche</h3>
              <span class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Essentielle</span>
            </div>
            <p class="text-gray-600 mb-4">Photo générale montrant l'état extérieur de la ruche</p>
            
            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2 flex items-center">
                💡 Conseils techniques
              </h4>
              <ul class="space-y-1">
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Prendre la photo à 2-3 mètres de distance</span>
                </li>
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Inclure l'environnement immédiat</span>
                </li>
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Éviter les contre-jours</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Suggestion 2 -->
          <div class="border rounded-lg p-5 hover:shadow-md bg-white">
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-semibold text-gray-900 text-lg">Activité à l'entrée</h3>
              <span class="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Recommandée</span>
            </div>
            <p class="text-gray-600 mb-4">Niveau d'activité des abeilles à l'entrée de la ruche</p>
            
            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2 flex items-center">
                💡 Conseils techniques
              </h4>
              <ul class="space-y-1">
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Se placer sur le côté, pas devant l'entrée</span>
                </li>
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Capturer le mouvement des abeilles</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Suggestion 3 -->
          <div class="border rounded-lg p-5 hover:shadow-md bg-white">
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-semibold text-gray-900 text-lg">Cadre de couvain</h3>
              <span class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Essentielle</span>
            </div>
            <p class="text-gray-600 mb-4">Œufs et larves visibles dans les alvéoles</p>
            
            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2 flex items-center">
                💡 Conseils techniques
              </h4>
              <ul class="space-y-1">
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Tenir le cadre face au soleil</span>
                </li>
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Incliner légèrement pour éviter les reflets</span>
                </li>
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Faire la mise au point sur les alvéoles</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Suggestion 4 -->
          <div class="border rounded-lg p-5 hover:shadow-md bg-white">
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-semibold text-gray-900 text-lg">Réserves de miel</h3>
              <span class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Essentielle</span>
            </div>
            <p class="text-gray-600 mb-4">Cadre de miel operculé pour évaluer les réserves</p>
            
            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2 flex items-center">
                💡 Conseils techniques
              </h4>
              <ul class="space-y-1">
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Montrer la différence entre operculé et non operculé</span>
                </li>
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  <span>Éviter les reflets sur le miel</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-semibold text-gray-900 mb-2">✅ Bonnes pratiques générales :</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>• Toujours prendre les photos avant d'enfumer</div>
            <div>• Noter l'heure et les conditions météo</div>
            <div>• Documenter toute anomalie observée</div>
            <div>• Prendre plusieurs angles si nécessaire</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  actionTitre: String,
  actionType: String
})

defineEmits(['close'])
</script>