const express = require('express');
const { listTickets } = require('../controllers/ticketsController');

const router = express.Router();

router.get('/', listTickets);

module.exports = router;
