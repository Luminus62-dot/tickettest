const pool = require('../../db');

async function listAllUsers() {
  const query = `
    SELECT id, name, email, role, invited_by
    FROM users
    ORDER BY id ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

async function createUser({ name, email, role = 'attendee', invitedBy = null }) {
  const query = `
    INSERT INTO users (name, email, role, invited_by)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, invited_by;
  `;
  const values = [name, email, role, invitedBy];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function createManagerInvitation({ name, email, invitedBy }) {
  return createUser({ name, email, role: 'manager', invitedBy });
}

async function updateUserRole(userId, role) {
  const query = `
    UPDATE users
    SET role = $1
    WHERE id = $2
    RETURNING id, name, email, role, invited_by;
  `;
  const values = [role, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = {
  listAllUsers,
  createUser,
  createManagerInvitation,
  updateUserRole
};
