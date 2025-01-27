const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const app = express();
const port = 9000;



// react@gmail.com
//react

const corsOption = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
  };
  
  app.use(cors(corsOption));


// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(router);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});