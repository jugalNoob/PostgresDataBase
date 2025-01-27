const pool = require("../db/conn"); // Ensure this path is correct
const keyjwt=require("../jwt/key")
const auth=require("../jwt/auth")
const bcrypt = require('bcrypt');

exports.first = async (req, res) => { 



     const { name, email, password } = req.body 

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Invalid input data" });
    }
    try {
        // Check if email exists
        const emailQuery = 'SELECT * FROM users WHERE email = $1';
        const emailResult = await pool.query(emailQuery, [email]);

        if (emailResult.rows.length > 0) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert user into database
        const insertQuery = `
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING *`;
        const result = await pool.query(insertQuery, [name, email, hashedPassword]);

        console.log("User inserted into database:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error)
        console.error("Database error:", error.stack);
        res.status(500).json({ error: error });
    }
  
}




exports.login=async (req,res)=>{

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
}




exports.auths=async(req, res) => {
    const userData = req.user;  // The user info from the JWT token is now available in req.user

    const user = await pool.query(
        "SELECT name, email, password FROM users WHERE id = $1",  // Corrected the missing comma
        [req.user.id]  // Accessing user directly since it's passed as `user_id` in the payload
      );
      console.log(user.rows[0])
      res.json(user.rows[0])
  
  };
  