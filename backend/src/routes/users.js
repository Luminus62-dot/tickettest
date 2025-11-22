const express = require('express');
const { listUsers } = require('../controllers/usersController');

const router = express.Router();

router.get('/', listUsers);

module.exports = router;
