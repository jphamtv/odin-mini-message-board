// db/pool.js
const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
  connectionString: DB_URL
});
