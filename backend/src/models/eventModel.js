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

async function createEvent(ownerId, eventData) {
  const { title, start_date, end_date, location } = eventData;

  const query = `
    INSERT INTO events (title, start_date, end_date, location, owner_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, title, start_date, end_date, location, owner_id;
  `;

  const values = [title, start_date, end_date, location, ownerId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function updateEvent(ownerId, eventId, eventData) {
  const fields = [];
  const values = [];
  const allowedFields = ['title', 'start_date', 'end_date', 'location'];

  allowedFields.forEach(field => {
    if (eventData[field] !== undefined) {
      values.push(eventData[field]);
      fields.push(`${field} = $${values.length}`);
    }
  });

  if (fields.length === 0) {
    return null;
  }

  values.push(eventId);
  values.push(ownerId);

  const query = `
    UPDATE events
    SET ${fields.join(', ')}
    WHERE id = $${values.length - 1} AND owner_id = $${values.length}
    RETURNING id, title, start_date, end_date, location, owner_id;
  `;

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
}

async function deleteEvent(ownerId, eventId) {
  const query = `
    DELETE FROM events
    WHERE id = $1 AND owner_id = $2
    RETURNING id;
  `;

  const { rows } = await pool.query(query, [eventId, ownerId]);
  return rows[0] || null;
}

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
