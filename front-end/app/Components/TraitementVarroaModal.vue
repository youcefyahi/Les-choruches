<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b">
                <h3 class="text-lg font-medium text-gray-900">Ajouter un traitement varroa</h3>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    <span class="sr-only">Fermer</span>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <!-- Formulaire -->
            <form @submit.prevent="submitTraitement" class="p-6">
                <div class="space-y-4">
                    <!-- Date -->
                    <div>
                        <label for="date" class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                        <input id="date" v-model="form.date" type="date" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>

                    <!-- Produit -->
                    <div>
                        <label for="produit" class="block text-sm font-medium text-gray-700 mb-2">Produit *</label>
                        <input id="produit" v-model="form.produit" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Nom du produit utilisé" />
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
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50">
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

const emit = defineEmits(['close', 'traitement-added'])

const isSubmitting = ref(false)
const error = ref(null)

const form = ref({
    date: new Date().toISOString().split('T')[0],
    produit: ''
})

// Reset form when modal opens
watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        form.value = {
            date: new Date().toISOString().split('T')[0],
            produit: ''
        }
        error.value = null
    }
})

function closeModal() {
    emit('close')
}

async function submitTraitement() {
    if (isSubmitting.value) return

    isSubmitting.value = true
    error.value = null

    try {
        const traitementData = {
            date: new Date(form.value.date),
            produit: form.value.produit
        }

        await $fetch(`http://localhost:3001/registres/${props.registreId}/traitements-varroa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: traitementData
        })

        emit('traitement-added')
        closeModal()

    } catch (err) {
        console.error('Erreur:', err)
        error.value = 'Erreur lors de l\'ajout du traitement.'
    } finally {
        isSubmitting.value = false
    }
}
</script>