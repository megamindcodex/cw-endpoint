const User = require("../models/user");

const get_all_users = async () => {
  try {
    const users = await User.find();

    if (users.length) {
      return users;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Couldn't get all users", err, err.message);
  }
};

module.exports = { get_all_users };
