// const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      console.log("Access Denied. No token provided");
      return res
        .status(401)
        .send({ error: "Access Denied. No token provided" });
    }
    const token = authHeader.replace("Bearer ", "");
    // console.log("Token:", token);

    if (!token) {
      console.log("Access Denied. No token provided");
      return res
        .status(401)
        .send({ error: "Access Denied. No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    // const user = await User.findById(decoded.id);

    // if (!user) {
    //   return res.status(401).send({ error: "Access Denied. Unauthorized" });
    // }`
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(500).send({ eror: "Internal Server Error" });
    console.error("Internal Server Error", err, err.message);
  }
};

module.exports = { authorize };
