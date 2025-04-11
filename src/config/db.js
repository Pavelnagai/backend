const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

pool.query('SELECT NOW()', (err) => {
  if (err) console.error('Ошибка подключения:', err);
  else console.log('✅ PostgreSQL подключён!');
});

module.exports = pool;