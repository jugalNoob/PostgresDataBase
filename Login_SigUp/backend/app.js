const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./db/conn'); // Ensure this path is correct
const keyjwt=require("./jwt/key")
const auth=require("./jwt/auth")
const app = express();
const port = 9000;


const corsOption = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
  };
  
  app.use(cors(corsOption));

// Middleware to parse JSON requests
app.use(express.json());



app.post('/add-user', async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password || typeof password !== "string") {
        return res.status(400).json({ error: "Invalid input data" });
    }

    try {
        // 1. Check if the email already exists in the database
        const emailQuery = 'SELECT * FROM users WHERE email = $1';
        const emailResult = await pool.query(emailQuery, [email]);

        if (emailResult.rows.length > 0) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 3. Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        console.log(result.rows);
        res.status(201).json(result.rows[0]); // Send back the new user data
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error saving user:", error.message);
    }
});

// check with bcript :::::::::::::::::::::::::::::::::::::::::::::::

// check with bycript name start row class line number

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

                // Generate JWT token after successful login
                const token = keyjwt(user.id); // Generate token using the user ID

                console.log(token)

                // Respond with the token and user details (excluding the password)
                return res.status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at
                    },
                    token: token // Send the JWT token
                });
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





app.get("/protected", auth,async (req, res) => {
    const userData = req.user;  // The user info from the JWT token is now available in req.user

    const user = await pool.query(
        "SELECT name, email, password FROM users WHERE id = $1",  // Corrected the missing comma
        [req.user.id]  // Accessing user directly since it's passed as `user_id` in the payload
      );
      console.log(user.rows[0])
      res.json(user.rows[0])
  
  });
  

  


  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
