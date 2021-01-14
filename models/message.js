const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({ 
    message: String,
    name: String,
    // will be date object
    timeStamp: String,
    chat:[
      {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Chat"
    }
  ]
  });

module.exports = mongoose.model("Message", messageSchema);
