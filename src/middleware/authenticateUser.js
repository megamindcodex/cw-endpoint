// import loginUser function so it can be called whithin the authenticateUser function
const { loginUser } = require("../controllers/loginUser");

const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);

    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
    console.error("Error authenticating user", err, err.message);
  }
};

module.exports = { authenticateUser };
