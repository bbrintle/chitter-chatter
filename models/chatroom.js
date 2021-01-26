const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({ 
    chatroomName: String,
    users: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"User"
        },
        username: String
      }
    ]
  });

module.exports = mongoose.model("Chatroom", chatroomSchema);