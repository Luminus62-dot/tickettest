const { getAllEvents } = require('../models/eventModel');

async function listEvents(req, res) {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    console.error('Error al obtener eventos', error);
    res.status(500).json({ message: 'No se pudieron cargar los eventos' });
  }
}

module.exports = { listEvents };
