import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useFirebaseStorage = () => {
  const storage = getStorage()

  const uploadFile = async (file: File, path: string): Promise<string> => {
    try {
      const fileRef = storageRef(storage, path)
      const snapshot = await uploadBytes(fileRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error('Erreur upload:', error)
      throw error
    }
  }

  const uploadAudio = async (audioBlob: Blob, apiculteurId: string): Promise<string> => {
    const fileName = `audio_${Date.now()}.webm`
    const path = `comptes-rendus/${apiculteurId}/audio/${fileName}`
    return uploadFile(new File([audioBlob], fileName), path)
  }

  const uploadPhoto = async (photoFile: File, apiculteurId: string): Promise<{ url: string, nom_fichier: string }> => {
    const path = `comptes-rendus/${apiculteurId}/photos/${photoFile.name}`
    const url = await uploadFile(photoFile, path)
    return { url, nom_fichier: photoFile.name }
  }

  const uploadVideo = async (videoFile: File, apiculteurId: string): Promise<{ url: string, nom_fichier: string }> => {
    const path = `comptes-rendus/${apiculteurId}/videos/${videoFile.name}`
    const url = await uploadFile(videoFile, path)
    return { url, nom_fichier: videoFile.name }
  }

  return {
    uploadAudio,
    uploadPhoto,
    uploadVideo
  }
}