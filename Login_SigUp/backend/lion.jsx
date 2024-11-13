

app.post('/add-users', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided and if password is a string
    if (!name || !email || !password || typeof password !== "string") {
        return res.status(400).json({ error: "Invalid input data" });
    }

    try {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate the JWT token (move this before insertion)
        const token = jwt.sign({ email }, keysecret, { expiresIn: '1h' });

        // Insert the user with the hashed password and token
        const result = await pool.query(
            'INSERT INTO public.users (name, email, password, token) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, token]  // Ensure you're inserting the token
        );

        // Respond with the user details and token
        res.status(201).json({
            message: 'User created successfully',
            user: result.rows[0],
            tokens, // Send the token in the response
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error saving user:", error.message);
    }
});




// POST route to add a new user
// POST route to add a new user

const keysecret = 'your_secret_key'; // Use environment variables for the secret key

app.post('/add-user', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided and if password is a string
    if (!name || !email || !password || typeof password !== "string") {
        return res.status(400).json({ error: "Invalid input data" });
    }

    try {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate the JWT token
        const token = jwt.sign({ email }, keysecret, { expiresIn: '1h' });

        // Insert the user with the hashed password and token
        const result = await pool.query(
            'INSERT INTO users (name, email, password, token) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, token]
        );

        console.log(result.rows);
        res.status(201).json(result.rows[0]); // Send the user details along with the token
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error saving user:", error.message);
    }
});






// 4. Generate JWT token for the new user
        // const token = jwt.sign({ userId: newUser.rows[0].id, email: newUser.rows[0].email }, JWT_SECRET, {
        //     expiresIn: '1h',
        // });

        // // 5. Respond with the token and user details (excluding the password)
        // res.status(201).json({
        //     message: 'User registered successfully',
        //     user: {
        //         id: newUser.rows[0].id,
        //         name: newUser.rows[0].name,
        //         email: newUser.rows[0].email,
        //         createdAt: newUser.rows[0].created_at,
        //     },
        //     token,
        // });