import { useEffect, useMemo, useState } from 'react'

const API_BASE = '/api/manager/concerts'

function ManagerConcerts() {
  const [token, setToken] = useState(localStorage.getItem('sessionToken') || '')
  const [concerts, setConcerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ title: '', start_date: '', location: '' })
  const [editingId, setEditingId] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('sessionToken', token)
  }, [token])

  const authHeaders = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token]
  )

  const fetchConcerts = async () => {
    setLoading(true)
    setError('')
    setStatusMessage('')
    try {
      const response = await fetch(API_BASE, {
        headers: authHeaders,
      })
      if (!response.ok) {
        const problem = await response.json().catch(() => ({}))
        throw new Error(problem.message || 'No se pudieron cargar los conciertos')
      }
      const data = await response.json()
      setConcerts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchConcerts()
    }
  }, [token])

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const resetForm = () => {
    setForm({ title: '', start_date: '', location: '' })
    setEditingId(null)
    setCreating(false)
  }

  const handleCreateOrUpdate = async event => {
    event.preventDefault()
    setCreating(true)
    setError('')
    setStatusMessage('')

    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `${API_BASE}/${editingId}` : API_BASE

    try {
      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const problem = await response.json().catch(() => ({}))
        throw new Error(problem.message || 'No se pudo guardar el concierto')
      }

      const saved = await response.json()
      if (editingId) {
        setConcerts(prev => prev.map(item => (item.id === editingId ? saved : item)))
        setStatusMessage('Concierto actualizado correctamente')
      } else {
        setConcerts(prev => [...prev, saved])
        setStatusMessage('Concierto creado correctamente')
      }
      resetForm()
    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const startEdit = concert => {
    setEditingId(concert.id)
    setForm({
      title: concert.title || '',
      start_date: concert.start_date || '',
      location: concert.location || '',
    })
    setStatusMessage('')
    setError('')
  }

  const deleteConcert = async id => {
    if (!confirm('¿Eliminar este concierto?')) return

    setError('')
    setStatusMessage('')
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      })
      if (!response.ok) {
        const problem = await response.json().catch(() => ({}))
        throw new Error(problem.message || 'No se pudo eliminar el concierto')
      }
      setConcerts(prev => prev.filter(item => item.id !== id))
      setStatusMessage('Concierto eliminado')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="card">
      <h2>Gestión de conciertos</h2>
      <p>Los managers pueden crear, editar o eliminar sus conciertos.</p>

      <div className="stacked-form">
        <label>
          Token de sesión
          <input
            type="text"
            value={token}
            onChange={event => setToken(event.target.value)}
            placeholder="Introduce el token de tu sesión"
            required
          />
        </label>
        <button onClick={fetchConcerts} disabled={!token || loading}>
          {loading ? 'Actualizando...' : 'Cargar conciertos'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {statusMessage && <p className="success">{statusMessage}</p>}

      <form onSubmit={handleCreateOrUpdate} className="stacked-form">
        <h3>{editingId ? 'Editar concierto' : 'Nuevo concierto'}</h3>
        <label>
          Título
          <input
            type="text"
            value={form.title}
            onChange={event => updateField('title', event.target.value)}
            required
          />
        </label>
        <label>
          Fecha de inicio
          <input
            type="date"
            value={form.start_date}
            onChange={event => updateField('start_date', event.target.value)}
          />
        </label>
        <label>
          Ubicación
          <input
            type="text"
            value={form.location}
            onChange={event => updateField('location', event.target.value)}
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={creating || !token}>
            {creating ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} disabled={creating}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="list">
        {loading && <p>Cargando conciertos...</p>}
        {!loading && concerts.length === 0 && <p>No tienes conciertos registrados.</p>}
        {concerts.map(concert => (
          <article key={concert.id} className="list-item">
            <header>
              <h4>{concert.title}</h4>
            </header>
            {concert.start_date && <p>Fecha: {new Date(concert.start_date).toLocaleDateString()}</p>}
            {concert.location && <p>Ubicación: {concert.location}</p>}
            <div className="item-actions">
              <button onClick={() => startEdit(concert)}>Editar</button>
              <button onClick={() => deleteConcert(concert.id)} className="danger">
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ManagerConcerts
