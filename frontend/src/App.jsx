import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventsPage from './pages/EventsPage'
import AdminInvitations from './pages/AdminInvitations'
import ManagerConcerts from './pages/ManagerConcerts'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Plataforma de tickets</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/events">Eventos</Link>
          <Link to="/admin/invitations">Invitaciones</Link>
          <Link to="/manager/concerts">Conciertos</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/admin/invitations" element={<AdminInvitations />} />
          <Route path="/manager/concerts" element={<ManagerConcerts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
