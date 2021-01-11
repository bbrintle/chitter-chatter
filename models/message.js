import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({ 
    message: String,
    name: String,
    // will be date object
    timeStamp: String,
    // e.g. read message by receiver of msg
    received: Boolean,
  });


// TODO: make sure messagecontents match collection in Mongo DB Atlas
export default mongoose.model("messageContent", messageSchema);
