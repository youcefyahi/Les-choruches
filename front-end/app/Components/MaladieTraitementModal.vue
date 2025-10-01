<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Ajouter une Maladie et Traitement</h2>

            <form @submit.prevent="submitMaladieTraitement">
                <!-- Date -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input v-model="formData.date" type="date" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>

                <!-- Maladie -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Maladie</label>
                    <input v-model="formData.maladie" type="text" required placeholder="Ex: Varroase, Loque américaine"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>

                <!-- Traitement (optionnel) -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Traitement (optionnel)</label>
                    <textarea v-model="formData.traitement" rows="3" placeholder="Ex: Apivar, destruction des cadres..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
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

const emit = defineEmits(['close', 'maladie-traitement-added'])

const formData = ref({
    date: '',
    maladie: '',
    traitement: ''
})

const error = ref('')
const isSubmitting = ref(false)

function closeModal() {
    formData.value = { date: '', maladie: '', traitement: '' }
    error.value = ''
    emit('close')
}

async function submitMaladieTraitement() {
    error.value = ''
    isSubmitting.value = true

    try {
        const maladieTraitementData = JSON.stringify({
            date: new Date(formData.value.date).toISOString(),
            maladie: formData.value.maladie,
            traitement: formData.value.traitement || undefined
        })

        await $fetch(`http://localhost:3001/registres/${props.registreId}/maladies-traitements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: maladieTraitementData
        })

        emit('maladie-traitement-added')
        closeModal()

    } catch (err) {
        console.error('Erreur:', err)
        error.value = 'Erreur lors de l\'ajout de la maladie et du traitement.'
    } finally {
        isSubmitting.value = false
    }
}
</script>