const express = require('express');

const app = express();
const pool = require('./db/conn'); // Correctly import pool

app.use(express.json()); // Middleware to parse JSON requests

const port = 9000;


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


  /// create a login system for the current user  ................................
  // You should use a library like bcrypt for hashing passwords
  // and a library like jsonwebtoken for generating and verifying JWTs
  // For simplicity, let's assume you have a simple comparison for password validation
  // In a real-world application, you should use a secure hashing algorithm and store passwords hashed
  // and compare hashed passwords
  // Also, you should consider implementing rate limiting to prevent brute force attacks
  app.post('/add-login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Query for the user with the specified email
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        // Check if a user with that email exists
        if (result.rows.length > 0) {
            const user = result.rows[0];

            console.log(user);

            // Compare the input password with the stored password
            // If you are using hashed passwords, use a library like bcrypt for comparison
            if (user.password === password) {
                console.log(user, 'login successfully');
                return res.status(200).json(user);
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error.message);
    }
});





app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  