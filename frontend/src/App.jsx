import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventsPage from './pages/EventsPage'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Plataforma de tickets</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/events">Eventos</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
