// utils/googleCalendar.js

/**
 * Crée un événement dans Google Calendar
 * @param {Object} rendezVous - Les données du rendez-vous
 * @param {string} rendezVous.nom - Nom du client
 * @param {string} rendezVous.email - Email du client
 * @param {string} rendezVous.telephone - Téléphone du client
 * @param {string} rendezVous.date - Date du rendez-vous (format ISO)
 * @param {string} rendezVous.heure - Heure du rendez-vous
 * @param {string} rendezVous.service - Type de service
 * @param {string} rendezVous.notes - Notes supplémentaires
 */
export async function createGoogleCalendarEvent(rendezVous) {
  try {
    // Vérifier si l'utilisateur a connecté Google Calendar
    const accessToken = localStorage.getItem('google_access_token')
    const refreshToken = localStorage.getItem('google_refresh_token')
    
    if (!accessToken || !refreshToken) {
      console.log('Google Calendar non connecté, événement non créé')
      return { success: false, message: 'Google Calendar non connecté' }
    }

    // Construire les données de l'événement
    const eventData = {
      accessToken,
      refreshToken,
      title: `Rendez-vous - ${rendezVous.service}`,
      description: `
Rendez-vous avec ${rendezVous.nom}

📞 Téléphone: ${rendezVous.telephone}
📧 Email: ${rendezVous.email}
🛠️ Service: ${rendezVous.service}

${rendezVous.notes ? `📝 Notes: ${rendezVous.notes}` : ''}

Créé automatiquement par Les Échoruches
      `.trim(),
      startTime: combineDateTime(rendezVous.date, rendezVous.heure),
      endTime: combineDateTime(rendezVous.date, rendezVous.heure, 60), // +1h par défaut
      attendeeEmail: rendezVous.email
    }

    // Appeler l'API backend pour créer l'événement
    const response = await $fetch('http://localhost:3001/google-calendar/create-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: eventData
    })

    if (response.success) {
      console.log('Événement Google Calendar créé:', response.eventId)
      return {
        success: true,
        eventId: response.eventId,
        eventLink: response.eventLink,
        message: 'Événement ajouté à Google Calendar'
      }
    } else {
      console.error('Erreur création événement:', response.error)
      return { success: false, message: response.error }
    }

  } catch (error) {
    console.error('Erreur lors de la création de l\'événement Google Calendar:', error)
    return { success: false, message: 'Erreur de connexion au calendrier' }
  }
}

/**
 * Combine une date et une heure en ISO string
 * @param {string} date - Date au format YYYY-MM-DD
 * @param {string} heure - Heure au format HH:MM
 * @param {number} offsetMinutes - Minutes à ajouter (optionnel)
 * @returns {string} - Date/heure combinée en format ISO
 */
function combineDateTime(date, heure, offsetMinutes = 0) {
  const dateTime = new Date(`${date}T${heure}:00`)
  
  if (offsetMinutes > 0) {
    dateTime.setMinutes(dateTime.getMinutes() + offsetMinutes)
  }
  
  return dateTime.toISOString()
}

/**
 * Vérifie si Google Calendar est connecté
 * @returns {boolean}
 */
export function isGoogleCalendarConnected() {
  const accessToken = localStorage.getItem('google_access_token')
  const refreshToken = localStorage.getItem('google_refresh_token')
  return !!(accessToken && refreshToken)
}