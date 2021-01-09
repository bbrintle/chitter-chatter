import mongoose from 'mongoose';
const { Schema } = mongoose;

// will be creating a post, comments, and messages schema 
//? posts will be for recognitions, comments to respond to recognitions (unless own schema not necessary?), and messages for dms

const postSchema = new Schema({
  // recognition posts 
    recPosts: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    // ?should we add comments to posts schema?
    // other users can add likes to recognition posts
    // ?would this need to be in a meta since all it will be doing is adding the likes?
    likes:  Number
  });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
