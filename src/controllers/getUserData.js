const User = require("../models/user");

const getUserData = async (userId) => {
  try {
    // console.log(userId);
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.error("Error getting user data", err, err.message);
  }
};

module.exports = { getUserData };
