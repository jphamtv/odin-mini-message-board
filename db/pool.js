// db/populatedb.js
// Designed to only be used ONCE
const { Client } = require('pg');
const { argv } = require('node:process'); // In the terminal run --> node db/populatedb.js <db-url>

// argv[2] is the cli argument <db-url> that was entered

const ROLE_NAME = 'J';
const PASSWORD = 'connectthedots';

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR ( 255 ),
  lastname
  email
  age
  bio
);

INSERT INTO messages (firstname, lastname, email, age, bio)
VALUES
  ('J', 'Pham', 'jpham@duck.com', 46, 'Enthusiast'),
  ('Charlie', 'Bukowski, 'charlie@woof.com', 9, 'Greenies monster');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: `postgresql://${ROLE_NAME}:${PASSWORD}@${argv[2]}/top_users`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();