const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({ 
    message: String,
    name: String,
    timeStamp: Date,
    senderID: {
      type: String,
      ref: "User"
    },
    chatroomID: String,
    chatroomName: String,
  });

module.exports = mongoose.model("Message", messageSchema);
