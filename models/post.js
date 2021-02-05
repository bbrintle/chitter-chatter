const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// will be creating a post, comments, and messages schema 
//? posts will be for recognitions, comments to respond to recognitions (unless own schema not necessary?), and messages for dms

const postSchema = new Schema({
  // recognition posts 
    name:String,
    recognitions: String,
    timeStamp: Date
  });

  module.exports = mongoose.model("Post", postSchema);
