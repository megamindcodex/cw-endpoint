const User = require("../models/user");
// import registerUser function so it can be called whithin the authenticatNewUser function
const { registerUser } = require("../controllers/registerUser");

// get the token from thesame request object from the route handler
const authenticateNewUser = async (req, res, next) => {
  try {
    // store the request object in the variable
    const { name, userName, email, password } = req.body;

    const userNameExist = await User.findOne({
      userName: userName,
    }).exec();
    const emailExist = await User.findOne({ email: email }).exec();

    let errorMsg = [];

    if (userNameExist) {
      errorMsg.push("User name already taken");
    }

    if (emailExist) {
      errorMsg.push("user with this email already exists");
    }

    if (errorMsg.length > 0) {
      console.log(errorMsg);
      return res.status(409).json({ errors: errorMsg });
    }

    const token = await registerUser(name, userName, email, password);
    req.token = token;
    console.log(token);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error authenticating new user: ", err, err.message);
  }
};

module.exports = { authenticateNewUser };
