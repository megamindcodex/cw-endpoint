const User = require("../models/user");
const jwt = require("jsonwebtoken");

// import loginUser function so it can be called whithin the authenticateUser function

const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // console.log(user);

    let isMatch = true;
    // Check if the user exists
    if (!user) {
      isMatch = false;
      console.log("User not found");
      return res.status(401).json({ error: "User not found" });
    } else if (password !== user.password) {
      isMatch = false;
      console.log("Incorrect password");
      return res.status(401).json({ error: "Incorrect password" });
    }

    if (isMatch) {
      //   create a new json web token
      const jwtSecrete = process.env.JWT_SECRETE;
      const token = jwt.sign({ id: user._id }, jwtSecrete);
      req.token = token;
    }

    next();
  } catch (err) {
    res.status(401).json({ error: `Internal server error ${err.message}` });
    console.error("Error authenticating user", err, err.message);
  }
};

module.exports = { authenticateUser };
