const mongoose = require("mongoose");
const db = require("../models");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chatdb");

const postSeed = [
  {
    recPosts: "Hello World",
    date: new Date(Date.now()),
    likes: 0
  },
  {
    recPosts: "You're doing great!",
    date: new Date(Date.now()),
    likes: 0
  },
];

db.Post.remove({})
  .then(() => db.Post.collection.insertMany(postSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
