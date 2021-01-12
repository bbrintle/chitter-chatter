import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({ 
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Message"
    }
    ],
    
    authorizedUsers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
  });

export default mongoose.model("chat", chatSchema);