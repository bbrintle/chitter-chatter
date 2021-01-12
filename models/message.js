import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({ 
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

export default mongoose.model("message", messageSchema);
