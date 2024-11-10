const express = require('express');
const cors=require('cors')
const app = express();
const pool = require('./db/conn'); // Correctly import pool

app.use(express.json()); // Middleware to parse JSON requests

const port = 9000;


const corsOption = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
};

app.use(cors(corsOption));

// POST route to add a new user
app.post('/add-user', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    console.log(result.rows);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error.message);
  }
});

// GET route to fetch all users
app.get('/Data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');

    // Log the rows for debugging
    console.log(result.rows);

    // Send the rows as a JSON response
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT route to update a user's email
//http://localhost:3000/update-user/anku sharma

// {
    
    
//   "email":"lionssharma.@gmail.com"
//  }

app.put('/update-user/:name', async (req, res) => {
  const { name } = req.params; // Get the name from the URL
  const { email } = req.body; // Get the new email from the request body

  try {
    const result = await pool.query(
      'UPDATE users SET email = $1 WHERE name = $2 RETURNING *',
      [email, name]
    );

    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

// DELETE route to delete a user by name
app.delete('/delete-user/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE name = $1', [name]);
    console.log(result.rows);

    res.status(204).send(); // 204 No Content, successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
