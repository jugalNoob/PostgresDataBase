const { Pool } = require('pg');

// Configuration for your PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
database: 'RestApi',
password: 'jugal786',
  port: 5432, // Default PostgreSQL port
});




// Check if the connection works
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
  release(); // Release the client back to the pool
});

module.exports = pool; // Export the pool

// require('dotenv').config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });
