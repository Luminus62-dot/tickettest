import { useEffect, useState } from 'react'

function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('No se pudieron obtener los eventos')
        }
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  if (loading) return <p>Cargando eventos...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <ul className="events-list">
      {events.length === 0 && <li>No hay eventos disponibles.</li>}
      {events.map(event => (
        <li key={event.id}>
          <h3>{event.title}</h3>
          {event.start_date && <p>Fecha inicio: {new Date(event.start_date).toLocaleDateString()}</p>}
          {event.location && <p>Ubicación: {event.location}</p>}
        </li>
      ))}
    </ul>
  )
}

export default EventsList
