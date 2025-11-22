const jwt = require('jsonwebtoken');
const {
  listAllUsers,
  createUser,
  createManagerInvitation,
  updateUserRole
} = require('../models/userModel');

async function listUsers(req, res) {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error al listar usuarios', error);
    res.status(500).json({ message: 'No se pudieron obtener los usuarios' });
  }
}

async function registerUser(req, res) {
  try {
    const { name, email, role = 'attendee' } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Nombre y correo son obligatorios' });
    }

    const newUser = await createUser({
      name,
      email,
      role,
      invitedBy: req.user?.id || null
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al registrar usuario', error);
    res.status(500).json({ message: 'No se pudo crear el usuario' });
  }
}

async function inviteManager(req, res) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Nombre y correo son obligatorios para invitar' });
    }

    const manager = await createManagerInvitation({
      name,
      email,
      invitedBy: req.user.id
    });

    const token = jwt.sign(
      { id: manager.id, role: manager.role, invitedBy: manager.invited_by },
      process.env.JWT_SECRET || 'development-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({ ...manager, invitationToken: token });
  } catch (error) {
    console.error('Error al invitar manager', error);
    res.status(500).json({ message: 'No se pudo generar la invitación' });
  }
}

async function assignRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: 'Debes indicar el rol a asignar' });
    }

    const updatedUser = await updateUserRole(id, role);

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error al asignar rol', error);
    res.status(500).json({ message: 'No se pudo actualizar el rol del usuario' });
  }
}

module.exports = {
  listUsers,
  registerUser,
  inviteManager,
  assignRole
};
