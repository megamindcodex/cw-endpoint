const Conversation = require("../models/conversation");

const get_chats = async (users) => {
  try {
    // Try finding conversation with the original order of users
    let conversation = await Conversation.findOne({ users: users });

    // If no conversation found, try finding conversation with reversed order of users
    if (!conversation) {
      const reversedUsers = [...users].reverse(); // Reverse the order of users
      conversation = await Conversation.findOne({ users: reversedUsers });
    }

    // If conversation still not found, throw an error
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
