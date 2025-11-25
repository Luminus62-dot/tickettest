import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EventsPage from './pages/EventsPage'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </main>
  )
}

export default App
