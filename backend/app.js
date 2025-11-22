const express = require('express');
const cors = require('cors');
const pool = require('./db');
codex/generate-react-and-node.js-project-with-postgresql-cycz79

const dotenv = require('dotenv');

const { authenticate } = require('./src/middlewares/authMiddleware');
main

const eventsRouter = require('./src/routes/events');
const ticketsRouter = require('./src/routes/tickets');
const usersRouter = require('./src/routes/users');

const app = express();

 codex/generate-react-and-node.js-project-with-postgresql-cycz79
app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/tickets', ticketsRouter);
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/events', authenticate, eventsRouter);
app.use('/api/tickets', authenticate, ticketsRouter);
main
app.use('/api/users', usersRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;

pool
  .connect()
  .then(client => {
    client.release();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos', err);
    process.exit(1);
  });

module.exports = app;
