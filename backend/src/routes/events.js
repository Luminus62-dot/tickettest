const express = require('express');
const {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventsController');

const router = express.Router();

router.get('/', listEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
