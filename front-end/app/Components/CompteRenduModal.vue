<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">
                    {{ compteRendu ? 'Modifier' : 'Nouveau' }} Compte Rendu
                </h2>
                <button type="button" @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-2xl">
                    ×
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Date -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input v-model="form.date" type="date" required
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>

                <!-- Type d'observations -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Type d'observations</label>
                    <div class="flex space-x-4">
                        <label class="flex items-center">
                            <input v-model="form.observations_type" type="radio" value="texte" class="mr-2">
                            Texte
                        </label>
                        <label class="flex items-center">
                            <input v-model="form.observations_type" type="radio" value="audio" class="mr-2">
                            Audio
                        </label>
                    </div>
                </div>

                <!-- Observations texte -->
                <div v-if="form.observations_type === 'texte'">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Observations (texte)</label>
                    <textarea v-model="form.observations_texte" rows="4" placeholder="Décrivez vos observations..."
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </textarea>
                </div>

                <!-- Observations audio -->
                <div v-if="form.observations_type === 'audio'">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Observations (audio)</label>
                    <AudioRecorder :model-value="form.observations_audio_url" @audio-recorded="handleAudioRecorded" />
                </div>

                <!-- Photos -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                    <input type="file" multiple accept="image/*" @change="handlePhotosUpload"
                        :disabled="isUploadingPhotos" class="w-full border border-gray-300 rounded-lg px-3 py-2">

                    <div v-if="isUploadingPhotos" class="text-sm text-blue-600 mt-2">
                        ⏳ Upload photos en cours...
                    </div>

                    <div v-if="form.photos.length > 0" class="mt-2 flex flex-wrap gap-2">
                        <div v-for="(photo, index) in form.photos" :key="index"
                            class="relative bg-gray-100 border rounded p-2 text-sm">
                            📷 {{ photo.nom_fichier }}
                            <button type="button" @click="removePhoto(index)"
                                class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                ×
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Vidéos -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Vidéos courtes</label>
                    <input type="file" multiple accept="video/*" @change="handleVideosUpload"
                        :disabled="isUploadingVideos" class="w-full border border-gray-300 rounded-lg px-3 py-2">

                    <div v-if="isUploadingVideos" class="text-sm text-blue-600 mt-2">
                        ⏳ Upload vidéos en cours...
                    </div>

                    <div v-if="form.videos.length > 0" class="mt-2 flex flex-wrap gap-2">
                        <div v-for="(video, index) in form.videos" :key="index"
                            class="relative bg-gray-100 border rounded p-2 text-sm">
                            🎥 {{ video.nom_fichier }}
                            <button type="button" @click="removeVideo(index)"
                                class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                ×
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Personnel présent -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Personnel présent</label>
                    <div class="space-y-2">
                        <div v-for="(personne, index) in form.personnel_present" :key="index" class="flex space-x-2">
                            <input v-model="personne.nom" type="text" placeholder="Nom"
                                class="flex-1 border border-gray-300 rounded-lg px-3 py-2">
                            <input v-model="personne.role" type="text" placeholder="Rôle (optionnel)"
                                class="flex-1 border border-gray-300 rounded-lg px-3 py-2">
                            <button type="button" @click="removePersonne(index)"
                                class="text-red-600 hover:text-red-800 px-2">
                                🗑️
                            </button>
                        </div>
                        <button type="button" @click="addPersonne" class="text-blue-600 hover:text-blue-800 text-sm">
                            + Ajouter une personne
                        </button>
                    </div>
                </div>

                <!-- Résultat IA -->
                <div v-if="aiResult" class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <label class="block text-sm font-medium text-green-700 mb-2">📝 Compte rendu enrichi par IA
                        :</label>
                    <div class="text-sm text-green-800 whitespace-pre-wrap">{{ aiResult }}</div>
                    <button type="button" @click="copyAIResult"
                        class="mt-2 text-xs text-green-600 hover:text-green-800">
                        📋 Copier le texte
                    </button>
                </div>

                <!-- Boutons -->
                <div class="flex justify-end space-x-2 pt-4">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Annuler
                    </button>

                    <button type="button" @click="enhanceWithAI" :disabled="isEnhancingWithAI"
                        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50">
                        {{ isEnhancingWithAI ? '⏳ IA en cours...' : '✨ Enrichir avec IA' }}
                    </button>

                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        {{ compteRendu ? 'Modifier' : 'Créer' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { uploadPhoto, uploadVideo } from '~/utils/firebaseStorage'

// ✅ CORRECTION : Utilise le composable useAuth
const { user, getUserId, getToken } = useAuth()

const isEnhancingWithAI = ref(false)
const aiResult = ref('')

const props = defineProps({
    isOpen: Boolean,
    compteRendu: Object
})

const emit = defineEmits(['close', 'save'])

const form = ref({
    date: '',
    observations_type: 'texte',
    observations_texte: '',
    observations_audio_url: '',
    photos: [],
    videos: [],
    personnel_present: []
})

const isUploadingPhotos = ref(false)
const isUploadingVideos = ref(false)

watch(() => props.compteRendu, (newValue) => {
    if (newValue) {
        form.value = {
            date: newValue.date,
            observations_type: newValue.observations_type || 'texte',
            observations_texte: newValue.observations_texte || '',
            observations_audio_url: newValue.observations_audio_url || '',
            photos: newValue.photos || [],
            videos: newValue.videos || [],
            personnel_present: newValue.personnel_present || []
        }
    } else {
        form.value = {
            date: new Date().toISOString().split('T')[0],
            observations_type: 'texte',
            observations_texte: '',
            observations_audio_url: '',
            photos: [],
            videos: [],
            personnel_present: []
        }
    }
}, { immediate: true })

const handleSubmit = () => {
    emit('save', form.value)
}

const handleAudioRecorded = (audioUrl) => {
    if (audioUrl) {
        form.value.observations_audio_url = audioUrl
    } else {
        form.value.observations_audio_url = ''
    }
}

// ✅ CORRECTION : Utilise getUserId() du composable
const handlePhotosUpload = async (event) => {
    const files = Array.from(event.target.files)

    if (files.length === 0) return

    isUploadingPhotos.value = true

    try {
        const userId = getUserId()  // ← Utilise le composable

        for (const file of files) {
            const photoData = await uploadPhoto(file, userId)
            form.value.photos.push(photoData)
        }
    } catch (error) {
        console.error('Erreur upload photos:', error)
        alert('Erreur lors de l\'upload des photos')
    } finally {
        isUploadingPhotos.value = false
        event.target.value = ''
    }
}

// ✅ CORRECTION : Utilise getUserId() du composable
const handleVideosUpload = async (event) => {
    const files = Array.from(event.target.files)

    if (files.length === 0) return

    isUploadingVideos.value = true

    try {
        const userId = getUserId()  // ← Utilise le composable

        for (const file of files) {
            const videoData = await uploadVideo(file, userId)
            form.value.videos.push(videoData)
        }
    } catch (error) {
        console.error('Erreur upload vidéos:', error)
        alert('Erreur lors de l\'upload des vidéos')
    } finally {
        isUploadingVideos.value = false
        event.target.value = ''
    }
}

const removePhoto = (index) => {
    form.value.photos.splice(index, 1)
}

const removeVideo = (index) => {
    form.value.videos.splice(index, 1)
}

const addPersonne = () => {
    form.value.personnel_present.push({ nom: '', role: '' })
}

const removePersonne = (index) => {
    form.value.personnel_present.splice(index, 1)
}

const enhanceWithAI = async () => {
    if (!form.value.observations_texte && !form.value.observations_audio_url) {
        alert('Ajoutez d\'abord des observations (texte ou audio) pour utiliser l\'IA !')
        return
    }

    isEnhancingWithAI.value = true

    try {
        const response = await $fetch('http://localhost:3001/ai/enhance-compte-rendu', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: {
                compteRendu: form.value
            }
        })

        aiResult.value = response.enhancedText

    } catch (error) {
        console.error('Erreur IA:', error)
        alert('Erreur lors de l\'enrichissement IA')
    } finally {
        isEnhancingWithAI.value = false
    }
}

const copyAIResult = () => {
    navigator.clipboard.writeText(aiResult.value)
    alert('Texte copié !')
}
</script>