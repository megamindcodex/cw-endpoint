const User = require("../models/user");

const get_convo = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const conversations = user.chatRooms;

    if (!conversations) {
      return false;
    }

    // console.log(conversations);
    return conversations;
  } catch (err) {
    console.error("Error getting user chatRooms");
    throw err;
  }
};

module.exports = { get_convo };
