const pool = require('../../db');

async function getAllEvents() {
  const query = `
    SELECT id, title, start_date, end_date, location
    FROM events
    ORDER BY start_date DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = { getAllEvents };
