
export const uploadAudio = async (audioBlob: Blob, apiculteurId: string): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('file', new File([audioBlob], `audio_${Date.now()}.webm`, { type: 'audio/webm' }))

    const { getToken } = useAuth()
    const token = getToken()

    const response = await fetch('http://localhost:3001/upload/audio', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Erreur upload: ${response.status}`)
    }

    const data = await response.json()
    return data.url

  } catch (error) {
    console.error('Erreur uploadAudio:', error)
    throw error
  }
}

/**
 * Upload une photo vers le backend
 */
export const uploadPhoto = async (photoFile: File, apiculteurId: string): Promise<{ url: string; nom_fichier: string }> => {
  try {
    const formData = new FormData()
    formData.append('file', photoFile)

    const { getToken } = useAuth()
    const token = getToken()

    const response = await fetch('http://localhost:3001/upload/photo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Erreur upload: ${response.status}`)
    }

    const data = await response.json()
    return {
      url: data.url,
      nom_fichier: data.nom_fichier
    }

  } catch (error) {
    console.error('Erreur uploadPhoto:', error)
    throw error
  }
}

/**
 * Upload une vidéo vers le backend
 */
export const uploadVideo = async (videoFile: File, apiculteurId: string): Promise<{ url: string; nom_fichier: string }> => {
  try {
    const formData = new FormData()
    formData.append('file', videoFile)

    const { getToken } = useAuth()
    const token = getToken()

    const response = await fetch('http://localhost:3001/upload/video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Erreur upload: ${response.status}`)
    }

    const data = await response.json()
    return {
      url: data.url,
      nom_fichier: data.nom_fichier
    }

  } catch (error) {
    console.error('Erreur uploadVideo:', error)
    throw error
  }
}