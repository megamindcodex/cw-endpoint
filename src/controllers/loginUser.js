const User = require("../models/user");
const jwt = require("jsonwebtoken");

// loginUser function decleration with userName and password passed as parameters
const loginUser = async (email, password) => {
  try {
    console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log(user);

    // Check if the user exists
    if (!user) {
      console.error("User not found");
      // You might want to return an error response here, depending on your application's needs
      return null; // Or throw an error
    }
    const isMatch = user.password === password; //checks if the password matches

    if (isMatch) {
      //   create a new json web token
      const jwtSecrete = process.env.JWT_SECRETE;
      const token = jwt.sign({ id: user._id }, jwtSecrete);

      //   returns token
      return token;
    } else {
      console.error("Passwords do not match");
      return null;
    }
  } catch (err) {
    console.error("Error login In user", err, err.message);
  }
};

module.exports = { loginUser };
