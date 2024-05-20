const User = require("../models/user");
const Conversation = require("../models/conversation");

const save_message_to_db = async (receiverName, message, timeStamp, userId) => {
  try {
    const user = await User.findById(userId).populate();
    const receiver = await User.findOne({ userName: receiverName }).populate();

    if (!user) {
      throw new Error("User not found");
    }

    if (!receiver) {
      throw new Error("receiver not found");
    }
    let conversation = await Conversation.findOne({
      users: { $all: [user.userName, receiverName] },
    });

    if (!conversation) {
      const newConversation = {
        users: [user.userName, receiverName],
        messages: [
          { sender: user.userName, receiver: receiverName, message, timeStamp },
        ],
      };
      conversation = await Conversation.create(newConversation);
      user.chatRooms.push({
        users: [user.userName, receiverName],
        hasRead: true,
      });
      receiver.chatRooms.push({
        users: [receiverName, user.userName],
        hasRead: false,
      });
    } else {
      conversation.messages.push({
        sender: user.userName,
        receiver: receiverName,
        message,
        timeStamp,
      });
      const userChatMessage = user.chatRooms.find(
        (chatRoom) =>
          chatRoom.users.includes(user.userName) &&
          chatRoom.users.includes(receiver.userName)
      );
      const receiverChatMessage = receiver.chatRooms.find(
        (chatRoom) =>
          chatRoom.users.includes(user.userName) &&
          chatRoom.users.includes(receiver.userName)
      );

      userChatMessage.hasRead = true;
      receiverChatMessage.hasRead = false;
    }

    const userChatMessage = user.chatRooms.find(
      (chatRoom) =>
        chatRoom.users.includes(user.userName) &&
        chatRoom.users.includes(receiver.userName)
    );
    const receiverChatMessage = receiver.chatRooms.find(
      (chatRoom) =>
        chatRoom.users.includes(user.userName) &&
        chatRoom.users.includes(receiver.userName)
    );

    await Promise.all([conversation.save(), user.save(), receiver.save()]);
    console.log(`${user.userName} hasRead ${userChatMessage.hasRead}`);
    console.log(`${receiverName} hasRead ${receiverChatMessage.hasRead}`);
    return { receiverName };
  } catch (err) {
    console.error("Error saving message to db:", err.message, err);
    throw err; // Throw the error for consistent error handling
  }
};

module.exports = { save_message_to_db };
