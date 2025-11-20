<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    @click="navigateTo('/comptes-rendus')">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <div class="bg-purple-100 p-3 rounded-lg">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold text-gray-800">Comptes Rendus</h3>
          <p class="text-sm text-gray-600">Interventions et observations</p>
        </div>
      </div>
      <div class="text-right">
        <div class="text-2xl font-bold text-purple-600">{{ count }}</div>
        <div class="text-xs text-gray-500">Total</div>
      </div>
    </div>
    <div class="flex items-center text-sm text-gray-600">
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
        </path>
      </svg>
      Gérer vos comptes rendus d'intervention
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { getUserId, getToken } = useAuth()
const count = ref('-')

const loadCount = async () => {
  try {
    const userId = getUserId()
    const token = getToken()

    const response = await $fetch(`http://localhost:3001/comptes-rendus/apiculteur/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    count.value = response.comptes_rendus.length
  } catch (error) {
    console.error('Erreur chargement comptes rendus:', error)
    count.value = '0'
  }
}

onMounted(() => {
  loadCount()
})
</script>