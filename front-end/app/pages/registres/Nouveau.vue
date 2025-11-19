<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="max-w-4xl mx-auto px-4 py-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button @click="retourDashboard" class="text-gray-500 hover:text-gray-700">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <h1 class="text-2xl font-bold text-gray-900">Nouveau Registre d'Élevage</h1>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-4xl mx-auto px-4 py-8">
            <form @submit.prevent="handleSubmit" class="space-y-8">

                <!-- Informations du Rucher -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations du Rucher</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="nomRucher" class="block text-sm font-medium text-gray-700 mb-2">
                                Nom du rucher *
                            </label>
                            <input id="nomRucher" v-model="form.nomRucher" type="text" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                placeholder="Ex: Rucher du Moulin" />
                        </div>

                        <div>
                            <label for="adresseRucher" class="block text-sm font-medium text-gray-700 mb-2">
                                Adresse du rucher *
                            </label>
                            <input id="adresseRucher" v-model="form.adresseRucher" type="text" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                placeholder="Adresse complète" />
                        </div>
                    </div>
                </div>

                <!-- Identification de la Ruche -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Identification de la Ruche</h2>

                    <div>
                        <label for="identificationRuche" class="block text-sm font-medium text-gray-700 mb-2">
                            Numéro/Code d'identification *
                        </label>
                        <input id="identificationRuche" v-model="form.identificationRuche" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Ex: R001, Ruche-A, etc." />
                    </div>
                </div>

                <!-- Informations sur la Reine -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations sur la Reine</h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label for="race" class="block text-sm font-medium text-gray-700 mb-2">
                                Race
                            </label>
                            <select id="race" v-model="form.race"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                                <option value="">Sélectionner une race</option>
                                <option value="Buckfast">Buckfast</option>
                                <option value="Carnolienne">Carnolienne</option>
                                <option value="Italienne">Italienne</option>
                                <option value="Noire">Noire</option>
                                <option value="Caucasienne">Caucasienne</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Reine marquée
                            </label>
                            <div class="flex items-center space-x-4">
                                <label class="flex items-center">
                                    <input v-model="form.marquee" type="radio" :value="true"
                                        class="text-yellow-600 focus:ring-yellow-500" />
                                    <span class="ml-2 text-sm text-gray-700">Oui</span>
                                </label>
                                <label class="flex items-center">
                                    <input v-model="form.marquee" type="radio" :value="false"
                                        class="text-yellow-600 focus:ring-yellow-500" />
                                    <span class="ml-2 text-sm text-gray-700">Non</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label for="origine" class="block text-sm font-medium text-gray-700 mb-2">
                                Origine
                            </label>
                            <input id="origine" v-model="form.origine" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                placeholder="Ex: Élevage local, achat..." />
                        </div>
                    </div>
                </div>

                <!-- Messages d'erreur/succès -->
                <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {{ error }}
                </div>

                <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                    {{ success }}
                </div>

                <!-- Boutons -->
                <div class="flex justify-end space-x-4">
                    <button type="button" @click="retourDashboard"
                        class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Annuler
                    </button>
                    <button type="submit" :disabled="loading"
                        class="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50">
                        <span v-if="loading">Création en cours...</span>
                        <span v-else>Créer le registre</span>
                    </button>
                </div>
            </form>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const { getUser, getToken } = useAuth()  // ✅ Utilise useAuth au lieu de localStorage

definePageMeta({
    middleware: 'auth'
})

// Données du formulaire
const form = ref({
    nomRucher: '',
    adresseRucher: '',
    identificationRuche: '',
    race: '',
    marquee: false,
    origine: ''
})

// États
const loading = ref(false)
const error = ref('')
const success = ref('')

// Fonction de soumission
async function handleSubmit() {
    loading.value = true
    error.value = ''
    success.value = ''

    try {
        // ✅ Récupérer l'utilisateur via useAuth()
        const user = getUser()
        
        if (!user || !user.firestoreId) {
            throw new Error('Utilisateur non connecté')
        }

        console.log('🔍 FirestoreID pour création registre:', user.firestoreId)

        // Créer l'objet registre
        const nouveauRegistre = {
            apiculteurId: user.firestoreId,  // ✅ Utilise firestoreId au lieu de id
            nomRucher: form.value.nomRucher,
            adresseRucher: form.value.adresseRucher,
            identificationRuche: form.value.identificationRuche,
            race: form.value.race || undefined,
            marquee: form.value.marquee,
            origine: form.value.origine || undefined,
            deplacements: [],
            recoltes: [],
            traitementsVarroa: [],
            nourrissements: [],
            maladiesTraitements: [],
            observations: []
        }

        // ✅ Appel API avec le token d'authentification
        const response = await $fetch('http://localhost:3001/registres', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`  // ✅ Ajoute le token
            },
            body: nouveauRegistre
        })

        success.value = 'Registre d\'élevage créé avec succès !'

        // Redirection vers la liste des registres après 2 secondes
        setTimeout(() => {
            navigateTo('/registres')
        }, 2000)

    } catch (err) {
        error.value = 'Erreur lors de la création du registre: ' + (err.message || 'Erreur inconnue')
        console.error('Erreur:', err)
    }

    loading.value = false
}

// Fonction de retour au dashboard
function retourDashboard() {
    navigateTo('/dashboard')
}
</script>