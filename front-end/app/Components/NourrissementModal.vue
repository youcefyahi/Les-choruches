<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Ajouter un Nourrissement</h2>

            <form @submit.prevent="submitNourrissement">
                <!-- Date -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input v-model="formData.date" type="date" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>

                <!-- Produit -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Produit</label>
                    <input v-model="formData.produit" type="text" required placeholder="Ex: Sirop de sucre"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>

                <!-- Quantité -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Quantité (litres)</label>
                    <input v-model.number="formData.quantite" type="number" step="0.1" required placeholder="Ex: 2.5"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>

                <!-- Erreur -->
                <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm">
                    {{ error }}
                </div>

                <!-- Boutons -->
                <div class="flex justify-end space-x-3">
                    <button type="button" @click="closeModal"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50">
                        {{ isSubmitting ? 'Ajout...' : 'Ajouter' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    isOpen: Boolean,
    registreId: String
})

const emit = defineEmits(['close', 'nourrissement-added'])

const formData = ref({
    date: '',
    produit: '',
    quantite: 0
})

const error = ref('')
const isSubmitting = ref(false)

function closeModal() {
    formData.value = { date: '', produit: '', quantite: 0 }
    error.value = ''
    emit('close')
}

async function submitNourrissement() {
    error.value = ''
    isSubmitting.value = true

    try {
        const nourrissementData = JSON.stringify({
            date: new Date(formData.value.date).toISOString(),
            produit: formData.value.produit,
            quantite: formData.value.quantite
        })

        await $fetch(`http://localhost:3001/registres/${props.registreId}/nourrissements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: nourrissementData
        })

        emit('nourrissement-added')
        closeModal()

    } catch (err) {
        console.error('Erreur:', err)
        error.value = 'Erreur lors de l\'ajout du nourrissement.'
    } finally {
        isSubmitting.value = false
    }
}
</script>