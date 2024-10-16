// db/populatedb.js
// Designed to only be used ONCE
const { Client } = require('pg');
const { argv } = require('node:process'); 
require('dotenv').config();

const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const NAME = process.env.DB_NAME;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, message)
VALUES
  ('jpham', 'Vamos!'),
  ('Charlie', 'Come on!');
`;

// In the terminal run --> node db/populatedb.js <db-url>
// argv[2] is the cli argument <db-url> that was entered
async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: `postgresql://${USER}:${PASSWORD}@${argv[2]}/${NAME}?ssl=true`, 
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
