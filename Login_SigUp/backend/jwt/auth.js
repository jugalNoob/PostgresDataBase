const jwt = require("jsonwebtoken");

// Secret key for signing and verifying JWT
const jwtSecret = "kjhdhjghbjvfdjhkgvfdgb hvbffgvdvfdgvbfgvcfvfgdvgfd"; // Make sure to replace with an actual secret, ideally using an environment variable

// Middleware to authenticate user via token in Authorization header
module.exports = function(req, res, next) {
  // Get token from Authorization header (expected format: "Bearer <token>")
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied. No token provided." });
  }

  // Check if the token format is correct (Bearer <token>)
  if (!token.startsWith("Bearer ")) {
    return res.status(400).json({ msg: "Invalid token format. Must be Bearer token." });
  }

  // Extract the token (removing "Bearer " prefix)
  const tokenWithoutBearer = token.split(" ")[1];

  // Verify the token
  try {
    // Decode the token to get user data
    const verify = jwt.verify(tokenWithoutBearer, jwtSecret);

    // Attach the decoded user info to the request object
    req.user = verify.user;

    // Log the decoded info (for debugging purposes)
    console.log(verify , 'i am verfiy serach');

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid token
    res.status(401).json({ msg: "Token is not valid" });
  }
};
