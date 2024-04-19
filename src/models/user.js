// import mongoose
const mongoose = require("mongoose");
const Conversation = require("./conversation");

// Define the user Schema field here
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chatRooms: [
    {
      users: [],
    },
  ],
});

// creatte and export the user model Schema
const User = mongoose.model("User", userSchema);
module.exports = User;
