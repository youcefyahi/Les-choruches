<template>
  <div class="border border-gray-300 rounded-lg p-4">
    <div class="flex items-center justify-between mb-3">
      <h4 class="font-medium text-gray-700">Enregistrement audio</h4>
      <div v-if="isRecording" class="text-red-500 text-sm animate-pulse">
        🔴 {{ formatTime(recordingTime) }}
      </div>
    </div>

    <!-- Contrôles d'enregistrement -->
    <div class="flex items-center space-x-3 mb-3">
      <button 
        v-if="!isRecording && !audioBlob"
        @click="startRecording"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
        🎤 Démarrer
      </button>

      <button 
        v-if="isRecording"
        @click="stopRecording"
        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center">
        ⏹️ Arrêter
      </button>

      <button 
        v-if="audioBlob && !isRecording"
        @click="playRecording"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
        ▶️ Écouter
      </button>

      <button 
        v-if="audioBlob && !isRecording"
        @click="resetRecording"
        class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center">
        🗑️ Recommencer
      </button>
    </div>

    <!-- Visualisation -->
    <div v-if="isRecording" class="mb-3">
      <div class="flex items-center space-x-1">
        <div v-for="i in 20" :key="i" 
             class="w-1 bg-red-500 rounded-full"
             :style="{ height: Math.random() * 20 + 5 + 'px' }">
        </div>
      </div>
    </div>

    <!-- Lecture audio -->
    <audio v-if="audioBlob" ref="audioPlayer" class="w-full" controls>
      <source :src="audioUrl" type="audio/webm">
    </audio>

    <!-- État -->
    <div v-if="audioBlob" class="text-sm text-green-600 mt-2">
      ✅ Enregistrement prêt ({{ formatSize(audioBlob.size) }})
    </div>

    <!-- Loading pendant upload -->
    <div v-if="isUploading" class="text-sm text-blue-600 mt-2">
      ⏳ Sauvegarde en cours...
    </div>

    <div v-if="error" class="text-sm text-red-600 mt-2">
      ❌ {{ error }}
    </div>
  </div>
</template>

<script setup>
import { uploadAudio } from '~/utils/firebaseStorage'

const props = defineProps({
  modelValue: String // URL audio existante
})

const emit = defineEmits(['update:modelValue', 'audio-recorded'])

const isRecording = ref(false)
const recordingTime = ref(0)
const audioBlob = ref(null)
const audioUrl = ref('')
const mediaRecorder = ref(null)
const recordingTimer = ref(null)
const error = ref('')
const isUploading = ref(false) // ← NOUVEAU

// Démarrer l'enregistrement
const startRecording = async () => {
  try {
    error.value = ''
    
    // Demander permission microphone
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      } 
    })

    // Créer MediaRecorder
    mediaRecorder.value = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus'
    })

    const chunks = []

    mediaRecorder.value.ondataavailable = (event) => {
      chunks.push(event.data)
    }

    // ← MODIFIÉ : Upload vers Firebase après l'arrêt
    mediaRecorder.value.onstop = async () => {
      // Créer le blob audio
      audioBlob.value = new Blob(chunks, { type: 'audio/webm' })
      audioUrl.value = URL.createObjectURL(audioBlob.value)
      
      // Arrêter le stream
      stream.getTracks().forEach(track => track.stop())
      
      try {
        // Upload vers Firebase Storage
        isUploading.value = true
        const user = useState('user')
        const firebaseUrl = await uploadAudio(audioBlob.value, user.value.id)
        
        // Émettre l'URL Firebase au lieu du blob
        emit('audio-recorded', firebaseUrl)
        
      } catch (uploadError) {
        console.error('Erreur upload audio:', uploadError)
        error.value = 'Erreur lors de la sauvegarde'
        emit('audio-recorded', null)
      } finally {
        isUploading.value = false
      }
    }

    // Démarrer l'enregistrement
    mediaRecorder.value.start()
    isRecording.value = true
    recordingTime.value = 0

    // Timer
    recordingTimer.value = setInterval(() => {
      recordingTime.value++
    }, 1000)

  } catch (err) {
    error.value = 'Erreur accès microphone: ' + err.message
  }
}

// Arrêter l'enregistrement
const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
    clearInterval(recordingTimer.value)
  }
}

// Lire l'enregistrement
const playRecording = () => {
  if (audioUrl.value) {
    const audio = new Audio(audioUrl.value)
    audio.play()
  }
}

// Recommencer
const resetRecording = () => {
  audioBlob.value = null
  audioUrl.value = ''
  recordingTime.value = 0
  error.value = ''
  isUploading.value = false
  emit('audio-recorded', null)
}

// Formatage du temps
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Formatage de la taille
const formatSize = (bytes) => {
  const kb = bytes / 1024
  return kb > 1024 ? `${(kb/1024).toFixed(1)} MB` : `${kb.toFixed(1)} KB`
}

// Cleanup
onUnmounted(() => {
  if (recordingTimer.value) {
    clearInterval(recordingTimer.value)
  }
  if (audioUrl.value) {
    URL.revokeObjectURL(audioUrl.value)
  }
})
</script>