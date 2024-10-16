// db/queries.js

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

async function insertMessage(username, message) {
  await pool.query('INSERT INTO messages (username, message) VALUES ($1, $2)', [username, message]);
}

async function getMessage(id) {
  const { row } = await pool.query('SELECT * FROM messages WHERE id=$1', [id]);
  return row;
}

module.export = {
  getAllMessages,
  insertMessage,
  getMessage,
};
