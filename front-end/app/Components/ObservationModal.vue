<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b">
                <h3 class="text-lg font-medium text-gray-900">Ajouter une observation</h3>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    <span class="sr-only">Fermer</span>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <!-- Formulaire -->
            <form @submit.prevent="submitObservation" class="p-6">
                <div class="space-y-4">
                    <!-- Date -->
                    <div>
                        <label for="date" class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                        <input id="date" v-model="form.date" type="date" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>

                    <!-- Contenu -->
                    <div>
                        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Observation *</label>
                        <textarea id="content" v-model="form.content" rows="4" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Décrivez votre observation..."></textarea>
                    </div>
                </div>

                <!-- Error -->
                <div v-if="error" class="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
                    <p class="text-sm text-red-700">{{ error }}</p>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end space-x-3 mt-6">
                    <button type="button" @click="closeModal"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50">
                        <span v-if="isSubmitting">Ajout...</span>
                        <span v-else>Ajouter</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    registreId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['close', 'observation-added'])

const isSubmitting = ref(false)
const error = ref(null)

const form = ref({
    date: new Date().toISOString().split('T')[0],
    content: ''
})

// Reset form when modal opens
watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        form.value = {
            date: new Date().toISOString().split('T')[0],
            content: ''
        }
        error.value = null
    }
})

function closeModal() {
    emit('close')
}

async function submitObservation() {
    if (isSubmitting.value) return

    isSubmitting.value = true
    error.value = null

    try {
        const observationData = {
            date: new Date(form.value.date),
            content: form.value.content
        }

        await $fetch(`http://localhost:3001/registres/${props.registreId}/observations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: observationData
        })

        emit('observation-added')
        closeModal()

    } catch (err) {
        console.error('Erreur:', err)
        error.value = 'Erreur lors de l\'ajout de l\'observation.'
    } finally {
        isSubmitting.value = false
    }
}
</script>