async function listUsers(req, res) {
  res.json([{ id: 1, name: 'Usuario de ejemplo' }]);
}

module.exports = { listUsers };
