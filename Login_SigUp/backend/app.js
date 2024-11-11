const express = require('express');
const bcrypt = require("bcrypt"); // Ensure bcrypt is required at the top of your file

const app = express();
const pool = require('./db/conn'); // Correctly import pool

app.use(express.json()); // Middleware to parse JSON requests

const port = 9000;




// POST route to add a new user
// POST route to add a new user
app.post('/add-user', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided and if password is a string
  if (!name || !email || !password || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid input data" });
  }

  try {
      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 12);

      // Insert the user with the hashed password
      const result = await pool.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [name, email, hashedPassword]
      );

      console.log(result.rows);
      res.status(201).json(result.rows[0]);
  } catch (error) {
      res.status(500).json({ error: error.message });
      console.error("Error saving user:", error.message);
  }
});



  /// create a login system for the current user  ................................
  // You should use a library like bcrypt for hashing passwords
  // and a library like jsonwebtoken for generating and verifying JWTs
  // For simplicity, let's assume you have a simple comparison for password validation
  // In a real-world application, you should use a secure hashing algorithm and store passwords hashed
  // and compare hashed passwords
  // Also, you should consider implementing rate limiting to prevent brute force attacks


  /// check with bycript name start row class line number
app.post('/add-login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Query for the user with the specified email
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        // Check if a user with that email exists
        if (result.rows.length > 0) {
            const user = result.rows[0];

            console.log(user);

            // Compare the input password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                console.log(user, 'login successfully');
                return res.status(200).json({ message: 'Login successful', user });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error during login:", error.message);
    }
});




// only password check required for password confirmation ::::::::::::::::::::::


app.post('/add-logins', async (req, res) => {
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
///add compare





app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  