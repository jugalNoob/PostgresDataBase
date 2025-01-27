const { Pool } = require('pg');

// Configuration for your PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
database: 'demo',
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