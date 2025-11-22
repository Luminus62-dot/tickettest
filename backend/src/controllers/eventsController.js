const { getAllEvents } = require('../models/eventModel');
 codex/generate-react-and-node.js-project-with-postgresql-cycz79
const { getAllEvents } = require('../models/eventModel');
const {
  getAllEvents,
  createEvent: createEventModel,
  updateEvent: updateEventModel,
  deleteEvent: deleteEventModel
} = require('../models/eventModel');
> main

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
codex/generate-react-and-node.js-project-with-postgresql-cycz79
module.exports = { listEvents };
async function createEvent(req, res) {
  const ownerId = req.user?.id;

  if (!ownerId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  try {
    const event = await createEventModel(ownerId, req.body || {});
    res.status(201).json(event);
  } catch (error) {
    console.error('Error al crear evento', error);
    res.status(500).json({ message: 'No se pudo crear el evento' });
  }
}

async function updateEvent(req, res) {
  const ownerId = req.user?.id;

  if (!ownerId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  const eventId = parseInt(req.params.id, 10);

  if (Number.isNaN(eventId)) {
    return res.status(400).json({ message: 'ID de evento inválido' });
  }

  try {
    const updated = await updateEventModel(ownerId, eventId, req.body || {});

    if (!updated) {
      return res.status(404).json({ message: 'Evento no encontrado o no autorizado' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar evento', error);
    res.status(500).json({ message: 'No se pudo actualizar el evento' });
  }
}

async function deleteEvent(req, res) {
  const ownerId = req.user?.id;

  if (!ownerId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  const eventId = parseInt(req.params.id, 10);

  if (Number.isNaN(eventId)) {
    return res.status(400).json({ message: 'ID de evento inválido' });
  }

  try {
    const deleted = await deleteEventModel(ownerId, eventId);

    if (!deleted) {
      return res.status(404).json({ message: 'Evento no encontrado o no autorizado' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar evento', error);
    res.status(500).json({ message: 'No se pudo eliminar el evento' });
  }
}

module.exports = { listEvents, createEvent, updateEvent, deleteEvent };
main
