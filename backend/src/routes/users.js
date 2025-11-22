const express = require('express');
const {
  listUsers,
  registerUser,
  inviteManager,
  assignRole
} = require('../controllers/usersController');
const { authenticate, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.get('/', listUsers);
router.post('/', authorizeRoles('admin'), registerUser);
router.post('/invite', authorizeRoles('admin'), inviteManager);
router.patch('/:id/role', authorizeRoles('admin'), assignRole);

module.exports = router;
