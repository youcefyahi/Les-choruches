<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-white">Prendre rendez-vous</h2>
                    <button @click="closeModal" class="text-white hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <p class="text-yellow-50 text-sm mt-1">{{ entreprise.nom }}</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitRendezVous" class="p-6 space-y-6">

                <!-- Contact -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Avec qui souhaitez-vous prendre RDV ?
                        *</label>
                    <div class="space-y-2">
                        <!-- Référent -->
                        <label class="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                            :class="{ 'border-yellow-500 bg-yellow-50': formData.contactType === 'referent' }">
                            <input type="radio" v-model="formData.contactType" value="referent" class="mr-3" />
                            <div>
                                <p class="font-medium text-gray-900">
                                    {{ entreprise.referentPrenom }} {{ entreprise.referentNom }}
                                </p>
                                <p class="text-sm text-gray-600">Référent - {{ entreprise.referentTelephone }}</p>
                            </div>
                        </label>

                        <!-- Employés -->
                        <label v-for="employe in entreprise.employes" :key="employe.id"
                            class="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                            :class="{ 'border-yellow-500 bg-yellow-50': formData.contactId === employe.id }">
                            <input type="radio" v-model="formData.contactId" :value="employe.id"
                                @change="formData.contactType = 'employe'" class="mr-3" />
                            <div>
                                <p class="font-medium text-gray-900">
                                    {{ employe.prenom }} {{ employe.nom }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {{ employe.poste || 'Employé' }} - {{ employe.telephone }}
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Date et heure -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                        <input v-model="formData.date" type="date" required :min="minDate"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Heure *</label>
                        <input v-model="formData.heure" type="time" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                    </div>
                </div>

                <!-- Durée -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Durée estimée *</label>
                    <select v-model.number="formData.duree" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                        <option :value="30">30 minutes</option>
                        <option :value="60">1 heure</option>
                        <option :value="90">1h30</option>
                        <option :value="120">2 heures</option>
                        <option :value="180">3 heures</option>
                    </select>
                </div>

                <!-- Motif -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Motif du rendez-vous *</label>
                    <select v-model="formData.motif" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500">
                        <option value="">Sélectionnez un motif</option>
                        <option value="Visite des ruches">Visite des ruches</option>
                        <option value="Entretien des ruches">Entretien des ruches</option>
                        <option value="Traitement">Traitement</option>
                        <option value="Récolte">Récolte</option>
                        <option value="Installation de nouvelles ruches">Installation de nouvelles ruches</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>

                <!-- Notes -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Notes complémentaires</label>
                    <textarea v-model="formData.notes" rows="3" placeholder="Informations supplémentaires..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"></textarea>
                </div>

                <!-- Erreur -->
                <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                    {{ error }}
                </div>

                <!-- Succès -->
                <div v-if="success"
                    class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded text-sm">
                    {{ success }}
                </div>

                <!-- Boutons -->
                <div class="flex justify-end space-x-3 pt-4 border-t">
                    <button type="button" @click="closeModal"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 flex items-center">
                        <svg v-if="!isSubmitting" class="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                        <span v-if="isSubmitting">Création en cours...</span>
                        <span v-else>Confirmer le rendez-vous</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const { getUserId, getToken } = useAuth()

const props = defineProps({
    isOpen: Boolean,
    entreprise: Object
})

const emit = defineEmits(['close', 'rdv-created'])

const formData = ref({
    contactType: 'referent',
    contactId: null,
    date: '',
    heure: '',
    duree: 60,
    motif: '',
    notes: ''
})

const error = ref('')
const success = ref('')
const isSubmitting = ref(false)

// Date minimum = aujourd'hui
const minDate = computed(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
})

function closeModal() {
    formData.value = {
        contactType: 'referent',
        contactId: null,
        date: '',
        heure: '',
        duree: 60,
        motif: '',
        notes: ''
    }
    error.value = ''
    success.value = ''
    emit('close')
}

async function submitRendezVous() {
    const userId = getUserId()
    error.value = ''
    success.value = ''
    isSubmitting.value = true

    try {
        // Récupérer les infos de l'apiculteur
        const userId = getUserId()
        if (!userId) {
            throw new Error('Utilisateur non connecté')
        }


        // Déterminer le contact
        let contactNom, contactPrenom, contactTelephone
        if (formData.value.contactType === 'referent') {
            contactNom = props.entreprise.referentNom
            contactPrenom = props.entreprise.referentPrenom
            contactTelephone = props.entreprise.referentTelephone
        } else {
            const employe = props.entreprise.employes.find(e => e.id === formData.value.contactId)
            contactNom = employe.nom
            contactPrenom = employe.prenom
            contactTelephone = employe.telephone
        }

        // Combiner date et heure
        const dateHeure = new Date(`${formData.value.date}T${formData.value.heure}`)

        const rdvData = {
            apiculteurId: userId,
            apiculteurNom: user.lastName,
            apiculteurPrenom: user.firstName,
            apiculteurEmail: user.email,
            apiculteurTelephone: user.phone || '',

            entrepriseId: props.entreprise.id,
            entrepriseNom: props.entreprise.nom,

            contactNom,
            contactPrenom,
            contactTelephone,

            dateHeure: dateHeure.toISOString(),
            duree: formData.value.duree,
            motif: formData.value.motif,
            notes: formData.value.notes,

            statut: 'en_attente'
        }

        // ÉTAPE 1 : Créer le RDV dans ta base de données (comme avant)
        const response = await $fetch('http://localhost:3001/rendez-vous', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(rdvData)
        })

        if (response.success) {
            // ÉTAPE 2 : Créer l'événement Google Calendar (NOUVEAU)
            const googleTokens = {
                accessToken: localStorage.getItem('google_access_token'),
                refreshToken: localStorage.getItem('google_refresh_token')
            }

            if (googleTokens.accessToken && googleTokens.refreshToken) {
                try {
                    // Calculer l'heure de fin
                    const startTime = new Date(`${formData.value.date}T${formData.value.heure}`)
                    const endTime = new Date(startTime.getTime() + formData.value.duree * 60000)

                    const calendarData = {
                        accessToken: googleTokens.accessToken,
                        refreshToken: googleTokens.refreshToken,
                        title: `RDV ${props.entreprise.nom} - ${formData.value.motif}`,
                        description: `Rendez-vous avec ${contactPrenom} ${contactNom}
📞 ${contactTelephone}
🏢 ${props.entreprise.nom}
📍 ${props.entreprise.adresse}
🛠️ ${formData.value.motif}
${formData.value.notes ? `📝 ${formData.value.notes}` : ''}`,
                        startTime: startTime.toISOString(),
                        endTime: endTime.toISOString(),
                        attendeeEmail: user.email
                    }

                    const calendarResponse = await $fetch('http://localhost:3001/google-calendar/create-event', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
                        body: calendarData
                    })

                    if (calendarResponse.success) {
                        success.value = 'Rendez-vous créé et ajouté à Google Calendar !'
                    } else {
                        success.value = 'Rendez-vous créé (erreur sync Google Calendar)'
                    }

                } catch (calendarError) {
                    console.error('Erreur Google Calendar:', calendarError)
                    success.value = 'Rendez-vous créé (Google Calendar non synchronisé)'
                }

            } else {
                success.value = 'Rendez-vous créé ! Connectez Google Calendar pour la synchronisation.'
            }

            emit('rdv-created')
            setTimeout(() => {
                closeModal()
            }, 2000)
        }
    } catch (err) {
        console.error('Erreur:', err)
        error.value = 'Erreur lors de la création du rendez-vous: ' + (err.message || 'Erreur inconnue')
    } finally {
        isSubmitting.value = false
    }
}
</script>