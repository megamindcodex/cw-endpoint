const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  users: [String],
  messages: [
    {
      sender: {
        type: String,
        required: true,
      },
      receiver: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timeStamp: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create and export the user model Schema
const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
