const User = require("../models/user");

const change_hasRead_to_true = async (userId, receiverName) => {
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const userName = user.userName;
    console.log(user);
    const chatRooms = user.chatRooms;

    const chatMessage = chatRooms.find(
      (chatRoom) =>
        chatRoom.users.includes(userName) &&
        chatRoom.users.includes(receiverName)
    );

    if (!chatMessage) {
      console.log("Couldn't find the specific chat message");
    }
    // console.log(chatMessage);

    // Update the hasRead property of the chat room object within the chatRooms array
    chatMessage.hasRead = true;

    await user.save();
    console.log(user);
    if (chatMessage.hasRead === true) {
      console.log("hasRead updated successfully");
      return true;
    }

    // Since chatRooms is an array of objects within the User document, you need to save the entire User document
  } catch (err) {
    console.log("Error changing hasRead to true", err, err.messgae);
  }
};

module.exports = { change_hasRead_to_true };
