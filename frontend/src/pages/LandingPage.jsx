import { useState, useEffect } from 'react'
import heroImg from '../assets/hero.png'
import bandImg from '../assets/band.png'

// Placeholder for Firestore logic
const TICKET_PRICE = 45.00
const INITIAL_TICKETS = 150

function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [ticketsRemaining, setTicketsRemaining] = useState(INITIAL_TICKETS)
  
  // Countdown Timer Logic
  useEffect(() => {
    const eventDate = new Date('2025-12-15T20:00:00').getTime()
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now
      
      if (distance < 0) {
        clearInterval(timer)
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  // Ticket Purchase Handler
  const handleBuyTicket = () => {
    // TODO: Integrate Firestore transaction here
    // Verify user identity, check ticket availability atomically
    if (ticketsRemaining > 0) {
      alert('Redirecting to secure payment gateway...')
      // Simulate decrement for demo
      setTicketsRemaining(prev => prev - 1)
    } else {
      alert('Sold Out!')
    }
  }

  return (
    <div className="landing-page">
      {/* 1. Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-overlay">
          <div className="container text-center">
            <h1 className="neon-text fade-in-up">NEON PULSE LIVE</h1>
            <h2 className="fade-in-up delay-1">DEC 15, 2025 • 8:00 PM • METROPOLIS ARENA</h2>
            
            <div className="countdown fade-in-up delay-2">
              <div className="time-unit"><span>{timeLeft.days}</span><small>DAYS</small></div>
              <div className="time-unit"><span>{timeLeft.hours}</span><small>HRS</small></div>
              <div className="time-unit"><span>{timeLeft.minutes}</span><small>MINS</small></div>
              <div className="time-unit"><span>{timeLeft.seconds}</span><small>SECS</small></div>
            </div>

            <button className="btn-primary fade-in-up delay-3" onClick={() => document.getElementById('tickets').scrollIntoView({ behavior: 'smooth' })}>
              Buy Tickets
            </button>
          </div>
        </div>
      </section>

      {/* 2. Band Section */}
      <section className="band-section section-padding">
        <div className="container">
          <div className="band-content">
            <div className="band-image">
              <img src={bandImg} alt="Neon Pulse Band" />
            </div>
            <div className="band-info">
              <h2 className="neon-text">THE BAND</h2>
              <p>Neon Pulse brings the future of indie rock to the stage. Known for their electrifying performances and synth-heavy soundscapes, they are redefining the live music experience.</p>
              <div className="members-grid">
                <div className="member-card">
                  <div className="member-avatar">🎸</div>
                  <h3>Alex</h3>
                  <p>Lead Guitar</p>
                </div>
                <div className="member-card">
                  <div className="member-avatar">🎤</div>
                  <h3>Sarah</h3>
                  <p>Vocals</p>
                </div>
                <div className="member-card">
                  <div className="member-avatar">🥁</div>
                  <h3>Mike</h3>
                  <p>Drums</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Event Information */}
      <section className="event-info section-padding">
        <div className="container text-center">
          <h2 className="neon-text">THE VENUE</h2>
          <p className="event-unique">Experience 360° sound and light immersion at the legendary Metropolis Arena.</p>
          <div className="map-placeholder">
            <p>📍 Metropolis Arena, 123 Music Ave, City Center</p>
            {/* Map iframe would go here */}
            <div className="map-mockup">Interactive Map Loading...</div>
          </div>
        </div>
      </section>

      {/* 4. Tickets Section */}
      <section id="tickets" className="tickets-section section-padding">
        <div className="container text-center">
          <h2 className="neon-text">SECURE YOUR SPOT</h2>
          <p>100% Digital & Secure. Anti-scalping technology enabled.</p>
          
          <div className="ticket-card">
            <h3>General Admission</h3>
            <div className="price">${TICKET_PRICE}</div>
            <div className="stock-counter">
              <span className="indicator" style={{ backgroundColor: ticketsRemaining > 20 ? '#00ff00' : '#ff0000' }}></span>
              {ticketsRemaining} Tickets Remaining
            </div>
            <button className="btn-primary" onClick={handleBuyTicket} disabled={ticketsRemaining === 0}>
              {ticketsRemaining > 0 ? 'Buy Now' : 'Sold Out'}
            </button>
            <p className="secure-note">🔒 Powered by Firestore Secure Transactions</p>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="gallery-section section-padding">
        <div className="container">
          <h2 className="text-center neon-text">GALLERY</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="gallery-item">
                <div className="gallery-placeholder">Moment {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>NEON PULSE</h3>
              <p>Follow the rhythm.</p>
            </div>
            <div className="footer-links">
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
              <a href="#">Facebook</a>
            </div>
            <div className="footer-legal">
              <p>© 2025 Neon Pulse. All rights reserved.</p>
              <a href="#">Privacy Policy</a>
              <a href="#">Support: help@neonpulse.com</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .hero {
          height: 100vh;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-overlay {
          background: rgba(0, 0, 0, 0.6);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero h1 { font-size: 4rem; margin-bottom: 0.5rem; }
        .hero h2 { font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 2rem; }
        
        .countdown {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .time-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 2rem;
          font-weight: bold;
          color: var(--color-primary);
        }
        .time-unit small {
          font-size: 0.8rem;
          color: #fff;
        }

        .band-content {
          display: flex;
          gap: 4rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .band-image { flex: 1; min-width: 300px; }
        .band-image img { width: 100%; border-radius: 10px; box-shadow: 0 0 20px rgba(176, 38, 255, 0.2); }
        .band-info { flex: 1; min-width: 300px; }
        .members-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem; margin-top: 2rem; }
        .member-card { background: var(--color-surface); padding: 1rem; border-radius: 10px; text-align: center; border: 1px solid #333; }
        .member-avatar { font-size: 2rem; margin-bottom: 0.5rem; }

        .map-placeholder {
          background: var(--color-surface);
          padding: 2rem;
          border-radius: 10px;
          margin-top: 2rem;
          border: 1px solid var(--color-primary);
        }
        .map-mockup {
          height: 300px;
          background: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          margin-top: 1rem;
        }

        .ticket-card {
          background: var(--color-surface);
          padding: 3rem;
          border-radius: 20px;
          border: 2px solid var(--color-secondary);
          max-width: 500px;
          margin: 2rem auto;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.1);
        }
        .price { font-size: 3rem; font-weight: bold; color: var(--color-primary); margin: 1rem 0; }
        .stock-counter { margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .indicator { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .secure-note { margin-top: 1rem; font-size: 0.8rem; color: var(--color-text-muted); }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }
        .gallery-item { aspect-ratio: 1; background: #222; border-radius: 10px; overflow: hidden; position: relative; }
        .gallery-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #444; }

        .footer { background: #000; padding: 3rem 0; margin-top: 5rem; border-top: 1px solid #333; }
        .footer-content { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 2rem; }
        .footer-links a, .footer-legal a { display: block; color: var(--color-text-muted); margin-bottom: 0.5rem; }
        .footer-links a:hover { color: var(--color-primary); }

        /* Animations */
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; transform: translateY(20px); }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 2.5rem; }
          .band-content { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}

export default LandingPage
