const User = require("../models/user");
const jwt = require("jsonwebtoken");

// loginUser function decleration with userName and password passed as parameters
const loginUser = async (email, password) => {
  try {
    // console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log(user);

    let isMatch = true;
    let errorMsg = [];
    // Check if the user exists
    if (!user) {
      isMatch = false;
      console.log("User not found");
      return errorMsg.push("User not found");
    } else if (password !== user.password) {
      isMatch = false;
      console.log("Incorrect password");
      return errorMsg.push("Incorrect password");
    }

    isMatch = true;

    if (isMatch) {
      //   create a new json web token
      const jwtSecrete = process.env.JWT_SECRETE;
      const token = jwt.sign({ id: user._id }, jwtSecrete);

      return token;
    }
  } catch (err) {
    console.error("Error login In user", err, err.message);
  }
};

module.exports = { loginUser };
