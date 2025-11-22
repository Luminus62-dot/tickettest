import { useEffect, useState } from 'react'

function AdminInvitations() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState(localStorage.getItem('sessionToken') || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem('sessionToken', token)
  }, [token])

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/admin/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const problem = await response.json().catch(() => ({}))
        throw new Error(problem.message || 'No se pudo enviar la invitación')
      }

      setMessage('Invitación enviada correctamente')
      setEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Invitar managers</h2>
      <p>Como administrador, envía invitaciones a nuevos managers usando su correo.</p>

      <form onSubmit={handleSubmit} className="stacked-form">
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

        <label>
          Correo del manager
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="manager@ejemplo.com"
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar invitación'}
        </button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  )
}

export default AdminInvitations
