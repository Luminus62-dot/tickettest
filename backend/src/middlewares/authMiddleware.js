const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticación faltante o inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'development-secret';
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (error) {
    console.error('Error al verificar el token JWT', error);
    return res.status(401).json({ message: 'No autorizado' });
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }

    next();
  };
}

module.exports = { authenticate, authorizeRoles };
