const Conversation = require("../models/conversation");

const get_chats = async (users) => {
  try {
    const conversation = await Conversation.findOne({ users: users });

    if (!conversation) {
      throw new Error(`No conversation found for users ${users}`);
    } else {
      return conversation;
    }
  } catch (err) {
    console.error(
      `Error getting conversation for users ${users}`,
      err,
      err.message
    );
    throw err;
  }
};

module.exports = { get_chats };
