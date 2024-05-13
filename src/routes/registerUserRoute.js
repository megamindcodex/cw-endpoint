const express = require("express");
const router = express.Router();

// import authenticateNewUser function for user login authentication
const { authenticateNewUser } = require("../middleware/authenticateNewUser");

//use the imported authenticateNewUser middleware to authenticate new users
router.post("/register", authenticateNewUser, (req, res) => {
  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: "Authentication failed" });
  } else {
    res.status(201).json({ token: token });
  }
});

module.exports = router;
