const express = require("express");
const router = express.Router();

// import authenticateUser function for user login authentication
const { authenticateUser } = require("../middleware/authenticateUser");

router.post("/login", authenticateUser, (req, res) => {
  // The authencation middleware has already handled the authentication
  // and attatched the token to the request object.

  res.status(200).json({ token: req.token });
});

module.exports = router;
