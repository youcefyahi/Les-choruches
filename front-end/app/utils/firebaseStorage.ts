import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export const uploadAudio = async (audioBlob: Blob, apiculteurId: string): Promise<string> => {
  const storage = getStorage()
  const fileName = `audio_${Date.now()}.webm`
  const path = `comptes-rendus/${apiculteurId}/audio/${fileName}`
  
  const fileRef = storageRef(storage, path)
  const snapshot = await uploadBytes(fileRef, new File([audioBlob], fileName))
  return await getDownloadURL(snapshot.ref)
}

export const uploadPhoto = async (photoFile: File, apiculteurId: string): Promise<{ url: string, nom_fichier: string }> => {
  const storage = getStorage()
  const path = `comptes-rendus/${apiculteurId}/photos/${photoFile.name}`
  
  const fileRef = storageRef(storage, path)
  const snapshot = await uploadBytes(fileRef, photoFile)
  const url = await getDownloadURL(snapshot.ref)
  
  return { url, nom_fichier: photoFile.name }
}

export const uploadVideo = async (videoFile: File, apiculteurId: string): Promise<{ url: string, nom_fichier: string }> => {
  const storage = getStorage()
  const path = `comptes-rendus/${apiculteurId}/videos/${videoFile.name}`
  
  const fileRef = storageRef(storage, path)
  const snapshot = await uploadBytes(fileRef, videoFile)
  const url = await getDownloadURL(snapshot.ref)
  
  return { url, nom_fichier: videoFile.name }
}