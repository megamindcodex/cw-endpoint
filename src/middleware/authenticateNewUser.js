// import registerUser function so it can be called whithin the authenticatNewUser function
const { registerUser } = require("../controllers/registerUser");

// get the token from thesame request object from the route handler
const authenticateNewUser = async (req, res, next) => {
  try {
    // store the request object in the variable
    const { name, userName, email, password } = req.body;
    const token = await registerUser(name, userName, email, password);

    req.token = token;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
    consle.error("Error authenticating new user: ", err, err.message);
  }
};

module.exports = { authenticateNewUser };
