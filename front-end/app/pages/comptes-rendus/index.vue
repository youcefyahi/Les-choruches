<template>
    <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800">Comptes Rendus</h1>
            <button @click="openModal" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                + Nouveau Compte Rendu
            </button>
        </div>

        <div v-if="loading" class="text-center py-8">
            Chargement...
        </div>

        <div v-else-if="comptesRendus.length === 0" class="text-center py-8 text-gray-500">
            Aucun compte rendu pour le moment
        </div>

        <div v-else class="grid gap-4">
            <CompteRenduCard v-for="compteRendu in comptesRendus" :key="compteRendu.id" :compte-rendu="compteRendu"
                @edit="editCompteRendu" @delete="deleteCompteRendu" />
        </div>

        <CompteRenduModal :is-open="isModalOpen" :compte-rendu="selectedCompteRendu" @close="closeModal"
            @save="saveCompteRendu" />
    </div>
</template>

<script setup>
// ✅ CORRIGÉ : Ajouter 'user' dans la destructuration
const { user, getUserId, getToken } = useAuth()

const comptesRendus = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const selectedCompteRendu = ref(null)

const loadComptesRendus = async () => {
    loading.value = true
    try {
        const userId = getUserId()
        const token = getToken()

        // ✅ Debug complet
        console.log('🔍 Debug state:', {
            user: user.value,
            userId: userId,
            token: token
        })

        const response = await $fetch(`http://localhost:3001/comptes-rendus/apiculteur/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        comptesRendus.value = response.comptes_rendus
    } catch (error) {
        console.error('Erreur:', error)
    }
    loading.value = false
}

const openModal = () => {
    selectedCompteRendu.value = null
    isModalOpen.value = true
}

const editCompteRendu = (compteRendu) => {
    selectedCompteRendu.value = compteRendu
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    selectedCompteRendu.value = null
}

const saveCompteRendu = async (data) => {
    try {
        const token = getToken()

        if (selectedCompteRendu.value) {
            await $fetch(`http://localhost:3001/comptes-rendus/${selectedCompteRendu.value.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            })
        } else {
            const userId = getUserId()
            await $fetch('http://localhost:3001/comptes-rendus', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: { ...data, apiculteur_id: userId }
            })
        }
        await loadComptesRendus()
        closeModal()
    } catch (error) {
        console.error('Erreur:', error)
    }
}

const deleteCompteRendu = async (id) => {
    if (confirm('Supprimer ce compte rendu ?')) {
        try {
            const token = getToken()
            await $fetch(`http://localhost:3001/comptes-rendus/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            await loadComptesRendus()
        } catch (error) {
            console.error('Erreur:', error)
        }
    }
}


onMounted(() => {
    loadComptesRendus()
})
</script>