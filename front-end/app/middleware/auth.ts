export default function () {
  if (import.meta.client) {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
    }
  }
}