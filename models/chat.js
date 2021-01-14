const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({ 
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

module.exports = mongoose.model("Chat", chatSchema);