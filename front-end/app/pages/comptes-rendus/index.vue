<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Comptes Rendus</h1>
                <button @click="openModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Nouveau Compte Rendu
                </button>
            </div>

            <div v-if="comptesRendus.length === 0" class="text-center text-gray-500 py-12">
                Aucun compte rendu pour le moment
            </div>

            <div v-else class="space-y-4">
                <div v-for="cr in comptesRendus" :key="cr.id"
                    class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-2">
                                <h2 class="text-lg font-semibold text-gray-800">
                                    {{ new Date(cr.date).toLocaleDateString('fr-FR') }}
                                </h2>
                                <!-- Badge statut -->
                                <span v-if="cr.statut === 'brouillon'"
                                    class="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                                    📝 Brouillon
                                </span>
                                <span v-else-if="cr.statut === 'en_attente_validation'"
                                    class="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                                    ⏳ En attente
                                </span>
                                <span v-else-if="cr.statut === 'validé'"
                                    class="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                                    ✅ Validé
                                </span>
                                <span v-else-if="cr.statut === 'rejeté'"
                                    class="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full">
                                    ❌ Rejeté
                                </span>
                            </div>

                            <p class="text-sm text-gray-600 mb-2">
                                <strong>Observations :</strong>
                                {{ cr.observations_type === 'audio' ? '🎤 Audio' : cr.observations_texte }}
                            </p>

                            <div class="text-xs text-gray-500">
                                📷 {{ cr.photos?.length || 0 }} photos •
                                🎥 {{ cr.videos?.length || 0 }} vidéos
                            </div>

                            <!-- Motif de rejet si rejeté -->
                            <div v-if="cr.statut === 'rejeté' && cr.motif_rejet"
                                class="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                <strong>Motif du rejet :</strong> {{ cr.motif_rejet }}
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <!-- Bouton Soumettre pour validation (si brouillon) -->
                            <button v-if="cr.statut === 'brouillon'" @click="soumettreValidation(cr.id)"
                                class="text-yellow-600 hover:text-yellow-800 px-3 py-1 border border-yellow-600 rounded-lg hover:bg-yellow-50">
                                📤 Soumettre
                            </button>

                            <!-- Bouton Modifier (si brouillon ou rejeté) -->
                            <button v-if="cr.statut === 'brouillon' || cr.statut === 'rejeté'" @click="openModal(cr)"
                                class="text-blue-600 hover:text-blue-800">
                                ✏️
                            </button>

                            <!-- Bouton Supprimer (si brouillon ou rejeté) -->
                            <button v-if="cr.statut === 'brouillon' || cr.statut === 'rejeté'"
                                @click="deleteCompteRendu(cr.id)" class="text-red-600 hover:text-red-800">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <CompteRenduModal :is-open="isModalOpen" :compte-rendu="selectedCompteRendu" @close="closeModal"
            @save="handleSave" />
    </div>
</template>

<script setup>
const { getUserId, getToken } = useAuth()
const comptesRendus = ref([])
const isModalOpen = ref(false)
const selectedCompteRendu = ref(null)

const loadComptesRendus = async () => {
    const userId = getUserId()
    const response = await $fetch(`http://localhost:3001/comptes-rendus/apiculteur/${userId}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    comptesRendus.value = response.comptes_rendus
}

const soumettreValidation = async (id) => {
    if (!confirm('Soumettre ce compte rendu pour validation ?')) return

    try {
        await $fetch(`http://localhost:3001/comptes-rendus/${id}/soumettre`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        alert('Compte rendu soumis pour validation !')
        await loadComptesRendus()
    } catch (error) {
        console.error('Erreur soumission:', error)
        alert('Erreur lors de la soumission')
    }
}

const openModal = (cr = null) => {
    selectedCompteRendu.value = cr
    isModalOpen.value = true
}

const closeModal = () => {
    selectedCompteRendu.value = null
    isModalOpen.value = false
}

const handleSave = async (data) => {
    try {
        if (selectedCompteRendu.value) {
            await $fetch(`http://localhost:3001/comptes-rendus/${selectedCompteRendu.value.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                body: data
            })
        } else {
            await $fetch('http://localhost:3001/comptes-rendus', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                body: data
            })
        }
        closeModal()
        await loadComptesRendus()
    } catch (error) {
        console.error('Erreur sauvegarde:', error)
        alert('Erreur lors de la sauvegarde')
    }
}

const deleteCompteRendu = async (id) => {
    if (!confirm('Supprimer ce compte rendu ?')) return

    try {
        await $fetch(`http://localhost:3001/comptes-rendus/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        await loadComptesRendus()
    } catch (error) {
        console.error('Erreur suppression:', error)
        alert('Erreur lors de la suppression')
    }
}

onMounted(() => {
    loadComptesRendus()
})
</script>