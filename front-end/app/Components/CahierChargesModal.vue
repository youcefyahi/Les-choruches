<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
    <div class="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 4v6m4-6v6m-8-6v6">
              </path>
            </svg>
            Cahier des Charges - Apiculteur d'Entreprise
          </h2>
          <button @click="$emit('close')" class="text-white hover:text-gray-200 text-2xl">
            ✕
          </button>
        </div>
        
        <!-- Stats globales -->
        <div class="flex items-center space-x-6 mt-3 text-purple-100 text-sm">
          <span>Conformité globale: 85%</span>
          <span>Points critiques: 3</span>
          <span>Dernière mise à jour: 15/11/2024</span>
        </div>
      </div>

      <!-- Onglets -->
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6">
          <button 
            v-for="onglet in onglets" 
            :key="onglet.key" 
            @click="activeOnglet = onglet.key"
            class="py-4 px-2 border-b-2 font-medium text-sm transition-colors" 
            :class="activeOnglet === onglet.key
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            <div class="flex items-center space-x-2">
              <span>{{ onglet.icon }}</span>
              <span>{{ onglet.label }}</span>
              <span 
                class="px-2 py-1 rounded-full text-xs"
                :class="onglet.badge.class"
              >
                {{ onglet.badge.text }}
              </span>
            </div>
          </button>
        </nav>
      </div>

      <!-- Contenu scrollable -->
      <div class="overflow-y-auto p-6" style="max-height: calc(90vh - 160px);">
        
        <!-- Onglet Obligations contractuelles -->
        <div v-if="activeOnglet === 'obligations'">
          <div class="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <h3 class="font-semibold text-purple-900 mb-2">Obligations Contractuelles</h3>
            <p class="text-purple-700 text-sm">
              Ensemble des obligations légales et contractuelles à respecter en tant qu'apiculteur d'entreprise
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Obligation 1 -->
            <div class="border rounded-lg p-5 bg-white">
              <div class="flex items-start justify-between mb-3">
                <h3 class="font-semibold text-gray-900">Déclaration de ruchers</h3>
                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Conforme</span>
              </div>
              <p class="text-gray-600 text-sm mb-3">Déclaration annuelle obligatoire avant le 31 décembre</p>
              <div class="text-xs text-gray-500 space-y-1">
                <div>📅 Échéance: 31 décembre 2024</div>
                <div>📋 Statut: Déclaré le 15/11/2024</div>
                <div>🏢 Organisme: DGAL</div>
              </div>
            </div>

            <!-- Obligation 2 -->
            <div class="border rounded-lg p-5 bg-white border-l-4 border-orange-500">
              <div class="flex items-start justify-between mb-3">
                <h3 class="font-semibold text-gray-900">Registre d'élevage</h3>
                <span class="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">À vérifier</span>
              </div>
              <p class="text-gray-600 text-sm mb-3">Tenue obligatoire du registre d'élevage avec visites</p>
              <div class="text-xs text-gray-500 space-y-1">
                <div>📅 Dernière visite: 10/10/2024</div>
                <div>📋 Prochaine visite: 15/12/2024</div>
                <div>⚠️ Action: Programmer visite</div>
              </div>
            </div>

            <!-- Obligation 3 -->
            <div class="border rounded-lg p-5 bg-white">
              <div class="flex items-start justify-between mb-3">
                <h3 class="font-semibold text-gray-900">Assurance responsabilité</h3>
                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Conforme</span>
              </div>
              <p class="text-gray-600 text-sm mb-3">Assurance obligatoire pour l'activité apicole</p>
              <div class="text-xs text-gray-500 space-y-1">
                <div>📅 Échéance: 01/04/2025</div>
                <div>📋 Police: AP-2024-001</div>
                <div>🏢 Assureur: AgriAssur</div>
              </div>
            </div>

            <!-- Obligation 4 -->
            <div class="border rounded-lg p-5 bg-white border-l-4 border-red-500">
              <div class="flex items-start justify-between mb-3">
                <h3 class="font-semibold text-gray-900">Formation sanitaire</h3>
                <span class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Non conforme</span>
              </div>
              <p class="text-gray-600 text-sm mb-3">Formation obligatoire tous les 5 ans</p>
              <div class="text-xs text-gray-500 space-y-1">
                <div>📅 Dernière formation: 2018</div>
                <div>⚠️ Statut: Formation expirée</div>
                <div>🎯 Action: S'inscrire avant fin 2024</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Onglet Standards de qualité -->
        <div v-if="activeOnglet === 'standards'">
          <div class="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h3 class="font-semibold text-green-900 mb-2">Standards de Qualité</h3>
            <p class="text-green-700 text-sm">
              Normes et critères qualité à respecter pour maintenir les labels et certifications
            </p>
          </div>

          <div class="space-y-6">
            <!-- Label Bio -->
            <div class="border rounded-lg p-5 bg-white">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <span class="mr-2">🌿</span> Certification Agriculture Biologique
                </h3>
                <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">Certifié</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <h4 class="font-medium text-gray-900">Critères environnementaux</h4>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center text-green-600">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      Zone de butinage respectée (3km min zone bio)
                    </li>
                    <li class="flex items-center text-green-600">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      Aucun traitement chimique de synthèse
                    </li>
                    <li class="flex items-center text-green-600">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      Ruches en matériaux naturels
                    </li>
                  </ul>
                </div>
                
                <div class="space-y-3">
                  <h4 class="font-medium text-gray-900">Contrôles qualité</h4>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center text-green-600">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      Analyses de résidus: Conformes
                    </li>
                    <li class="flex items-center text-orange-600">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                      Prochain contrôle: 22 décembre 2024
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Qualité miel -->
            <div class="border rounded-lg p-5 bg-white">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span class="mr-2">🍯</span> Standards Qualité Miel
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center p-4 bg-green-50 rounded">
                  <div class="text-2xl font-bold text-green-600">18.2%</div>
                  <div class="text-sm text-green-700">Humidité</div>
                  <div class="text-xs text-gray-600">Max 20% - ✅ Conforme</div>
                </div>
                <div class="text-center p-4 bg-green-50 rounded">
                  <div class="text-2xl font-bold text-green-600">7.8</div>
                  <div class="text-sm text-green-700">HMF</div>
                  <div class="text-xs text-gray-600">Max 40mg/kg - ✅ Conforme</div>
                </div>
                <div class="text-center p-4 bg-green-50 rounded">
                  <div class="text-2xl font-bold text-green-600">3.8</div>
                  <div class="text-sm text-green-700">pH</div>
                  <div class="text-xs text-gray-600">3.2-4.5 - ✅ Conforme</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Onglet Checklist de conformité -->
        <div v-if="activeOnglet === 'checklist'">
          <div class="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 class="font-semibold text-blue-900 mb-2">Checklist de Conformité</h3>
            <p class="text-blue-700 text-sm">
              Liste de contrôle interactive pour vérifier la conformité de votre exploitation
            </p>
          </div>

          <div class="space-y-6">
            <!-- Période actuelle -->
            <div class="border rounded-lg p-5 bg-white">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Décembre 2024 - Contrôles mensuels</h3>
              
              <div class="space-y-3">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked class="w-4 h-4 text-green-600 rounded focus:ring-green-500">
                  <span class="text-gray-700">Visite de tous les ruchers effectuée</span>
                  <span class="ml-auto text-xs text-green-600">✅ Fait le 10/12</span>
                </label>

                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked class="w-4 h-4 text-green-600 rounded focus:ring-green-500">
                  <span class="text-gray-700">Registre d'élevage à jour</span>
                  <span class="ml-auto text-xs text-green-600">✅ Fait le 12/12</span>
                </label>

                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 text-green-600 rounded focus:ring-green-500">
                  <span class="text-gray-700">Contrôle sanitaire effectué</span>
                  <span class="ml-auto text-xs text-orange-600">⏳ À programmer</span>
                </label>

                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 text-green-600 rounded focus:ring-green-500">
                  <span class="text-gray-700">Rapport mensuel envoyé</span>
                  <span class="ml-auto text-xs text-red-600">❌ Échéance: 15/12</span>
                </label>
              </div>
            </div>

            <!-- Contrôles trimestriels -->
            <div class="border rounded-lg p-5 bg-white">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Q4 2024 - Contrôles trimestriels</h3>
              
              <div class="space-y-3">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked class="w-4 h-4 text-green-600 rounded focus:ring-green-500">
                  <span class="text-gray-700">Analyse qualité miel</span>
                  <span class="ml-auto text-xs text-green-600">✅ Conforme</span>
                </label>

                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 text-green-600 rounded focus:ring-green-500">
                  <span class="text-gray-700">Inventaire du matériel</span>
                  <span class="ml-auto text-xs text-orange-600">⏳ En cours</span>
                </label>

                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 text-green-600 rounded focus:ring-green-500">
                  <span class="text-gray-700">Bilan économique trimestriel</span>
                  <span class="ml-auto text-xs text-red-600">❌ À faire</span>
                </label>
              </div>
            </div>

            <!-- Actions correctives -->
            <div class="border-l-4 border-red-500 bg-red-50 p-4 rounded">
              <h4 class="font-semibold text-red-900 mb-2">Actions correctives nécessaires</h4>
              <ul class="space-y-2 text-sm text-red-700">
                <li>• S'inscrire à la formation sanitaire obligatoire</li>
                <li>• Programmer le contrôle sanitaire de décembre</li>
                <li>• Envoyer le rapport mensuel avant le 15/12</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean
})

defineEmits(['close'])

// État des onglets
const activeOnglet = ref('obligations')

// Configuration des onglets
const onglets = [
  {
    key: 'obligations',
    label: 'Obligations contractuelles',
    icon: '📋',
    badge: { text: '1 critique', class: 'bg-red-100 text-red-800' }
  },
  {
    key: 'standards',
    label: 'Standards qualité',
    icon: '⭐',
    badge: { text: 'Certifié', class: 'bg-green-100 text-green-800' }
  },
  {
    key: 'checklist',
    label: 'Checklist conformité',
    icon: '✅',
    badge: { text: '75%', class: 'bg-blue-100 text-blue-800' }
  }
]
</script>