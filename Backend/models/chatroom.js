const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const MessageSchema = mongoose.Schema(
  {
    sender: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const chatRoomSchema = mongoose.Schema(
  {
    conversationName: { type: String, required: false },
    initiator: { type: String, required: true },
    userIds: { type: Array, required: true },
    readby: { type: Array, required: false },
    messages: [MessageSchema],
  },
  { timestamps: true }
);



module.exports = mongoose.model("ChatRoom", chatRoomSchema);