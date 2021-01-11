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

// TODO: make sure messagecontents match collection in Mongo DB Atlas
export default mongoose.model("messagecontents", messageSchema);
