const jwt = require("jsonwebtoken");


const jwtSecret = "kjhdhjghbjvfdjhkgvfdgb hvbffgvdvfdgvbfgvcfvfgdvgfd"; // Make sure to replace with an actual secret, ideally using an environment variable

// Function to generate JWT for the user
function keyjwt(user_id, email) {
  const payload = {
    user: {
      id: user_id,   // Include user ID
      email: email,   // Include email for better verification
     
    }
  };

  // Sign the token with the payload and the secret, set to expire in 1 hour
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

module.exports = keyjwt;
