import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({ 
    message: String,
    name: String,
    // will be date object
    timeStamp: String,
    // e.g. read message by receiver of msg
    received: Boolean,
  });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
