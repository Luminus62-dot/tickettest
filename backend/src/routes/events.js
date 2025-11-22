const express = require('express');
const { listEvents } = require('../controllers/eventsController');

const router = express.Router();

router.get('/', listEvents);

module.exports = router;
