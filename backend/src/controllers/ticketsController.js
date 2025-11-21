async function listTickets(req, res) {
  res.json([{ id: 1, eventId: 1, status: 'disponible' }]);
}

module.exports = { listTickets };
