const User = require("../models/user");
const { generateToken } = require("../controllers/generateToken");

const registerUser = async (name, userName, email, password) => {
  try {
    const registerData = {
      name: name,
      userName: userName,
      email: email,
      password: password,
    };
    // console.log(registerData);
    const user = await User.create(registerData);

    if (user) {
      const userId = user._id; //get the user Id from the user object
      const token = generateToken(userId); //the token value generated is been returned from the generateToken function

      console.log("User created successfully", user);
      return token;
    }
  } catch (err) {
    console.error("Error registering user: ", err, err.message);
  }
};

module.exports = { registerUser };
