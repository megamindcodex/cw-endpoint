const User = require("../models/user");

const change_hasRead_to_true = async (userId, receiverName, condition) => {
  try {
    // console.log(`condition is ${condition}`);
    const user = await User.findOne({ _id: userId });
    const receiver = await User.findOne({ userName: receiverName });

    if (!user) {
      throw new Error("User not found");
    }

    if (!receiver) {
      throw new Error("Receiver not found");
    }

    const userName = user.userName;
    const chatRooms = user.chatRooms;

    // console.log(chatRooms);
    // console.log(receiverName, userName);

    const chatMessage = chatRooms.find(
      (chatRoom) =>
        chatRoom.users.includes(userName) &&
        chatRoom.users.includes(receiverName)
    );

    if (!chatMessage) {
      console.log("Couldn't find the specific chat message");
    }

    // Update the hasRead property of the chat room object within the chatRooms array

    // if (condition === undefined) {
    // }
    chatMessage.hasRead = condition;

    await user.save();
    console.log(chatMessage);

    console.log(`${userName} hasRead is: ${chatMessage.hasRead}`);
    console.log("hasRead updated successfully");
    // console.log(user.chatRooms);
    return chatMessage.hasRead;

    // Since chatRooms is an array of objects within the User document, you need to save the entire User document
  } catch (err) {
    console.log("Error toggling has read", err, err.messgae);
  }
};

const change_hasRead_to_false = async (userId, receiverName, condition) => {
  try {
    // console.log(`condition is ${condition}`);
    const user = await User.findOne({ _id: userId });
    const receiver = await User.findOne({ userName: receiverName });

    if (!user) {
      throw new Error("User not found");
    }

    if (!receiver) {
      throw new Error("Receiver not found");
    }

    const userName = user.userName;
    // console.log(user);
    const chatRooms = receiver.chatRooms;

    // console.log(chatRooms);
    // console.log(receiverName, userName);

    const chatMessage = chatRooms.find(
      (chatRoom) =>
        chatRoom.users.includes(userName) &&
        chatRoom.users.includes(receiver.userName)
    );

    if (!chatMessage) {
      console.log("Couldn't find the specific chat message");
    }

    // Update the hasRead property of the chat room object within the chatRooms array

    // if (condition === undefined) {
    // }
    chatMessage.hasRead = condition;

    await receiver.save();
    console.log(chatMessage);

    console.log(`${receiver.userName} hasRead is : ${chatMessage.hasRead}`);
    console.log("hasRead updated successfully");
    // console.log(user.chatRooms);
    return chatMessage.hasRead;

    // Since chatRooms is an array of objects within the User document, you need to save the entire User document
  } catch (err) {
    console.log("Error toggling has read", err, err.messgae);
  }
};

module.exports = { change_hasRead_to_true, change_hasRead_to_false };
