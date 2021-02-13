// importing dotenv
require('dotenv').config()

// import pusher
const Pusher =require("pusher");
const cors = require("cors");

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

// pusher
const pusher = new Pusher({
  appId: "1139535",
  key: "02315d0fbb0283ef5f14",
  secret: "bd73c38c33ed0f0f47e6",
  cluster: "us3",
  useTLS: true
});

//Include models
const User = require("./models/user");
const Message = require("./models/message");
const Chatroom = require("./models/chatroom");
const Post = require("./models/post");

//Set up Cookie Parser.
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
// Used to parse JSON bodies, don't need body-parser package
// Also needed for Postman to work
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(cors())

// Connect to the Mongo DB
const mongoose = require("mongoose");

const connection_url = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.2neef.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGODB_URI || connection_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

// This will trigger once the mongoose DB has been opened
db.once('open', ()=>{
  console.log('DB connected')

  // messagecontent refers to the collection in mongoDB (from dbMessage.js)
  const msgCollection = db.collection('messages')
  const recCollection= db.collection('posts')
  // changeStream is a method that allows us to watch mongoDB
  const changeStream = msgCollection.watch()
  const recChangeStream = recCollection.watch()
  
  // Using the .watch() from changeStream, we check to see if the DB has had any changes, and then save that change to the variable "change"
  changeStream.on('change', (change) => {
      // If the operationType from the change is "insert", pusher will then trigger and send back the Name, Message, Timestap, and Received
      if(change.operationType === 'insert') {
          //fullDocument is the area that provides the message _Id, Name, Message, Timestamp, and Reveicved. Save it to the variable "messageDetails"
          const messageDetails = change.fullDocument;
          // Trigger pusher and use the 'messages' channel and set the Event to 'inserted' to add the messageDetails
          pusher.trigger('messages', 'inserted',
              {
                  name: messageDetails.name,
                  message: messageDetails.message,
                  timeStamp: messageDetails.timeStamp,
                  senderID: messageDetails.senderID,
                  chatroomID: messageDetails.chatroomID,
                  // chatroomName: messageDetails.chatroomName,
              }
          );
      } else {
          console.log("Error triggering Messaging Pusher")
      }
  });
  recChangeStream.on('change', (change) => {
    // If the operationType from the change is "insert", pusher will then trigger and send back the Name, Message, Timestap, and Received
    if(change.operationType === 'insert') {
        //fullDocument is the area that provides the message _Id, Name, Message, Timestamp, and Reveicved. Save it to the variable "messageDetails"
        const recognitionDetails = change.fullDocument;
        // Trigger pusher and use the 'messages' channel and set the Event to 'inserted' to add the messageDetails
        pusher.trigger('posts', 'inserted',
            {
                name: recognitionDetails.name,
                rePosts: recognitionDetails.message,
                timeStamp: recognitionDetails.timeStamp,
                senderID: recognitionDetails.senderID,
            }
        );
    } else {
        console.log("Error triggering Recognition Pusher")
    }
  })
})

//Messages APIs
// GET route for getting all messages
app.get("/api/messages/all", function(req, res) {
  Message.find(req.body)
  .then(function(dbMessage) {
    res.json(dbMessage);
  });
});

// POST route for saving a new message
app.post("/api/messages", function(req, res) {
  Message.create(req.body)
    .then(function(dbMessage) {
      res.json(dbMessage);
    });
});

app.get("/api/messages/:chatroomID", function(req, res) {
  Message.find({ chatroomID: req.params.chatroomID })
  .then(function(dbMessage) {
    res.json(dbMessage);
  });
});



//Chatroom APIs
// GET route for getting all Chatboxes
app.get(`/api/chatrooms/:id`, function(req, res) {
  User.findById({_id: req.params.id})
    .populate('chatrooms')
    .exec((error, document) => {
      if(error) {
        console.log(error);
      } else {
        res.json(document.chatrooms);
      }
    })
});

// POST route for saving a new message
app.post("/api/chatrooms", function(req, res) {
  /*Receive a set of user IDs/username which 
  will be used to populate their chatroom array
  */  
  const newChatroom = new Chatroom(req.body);
  //Chatroom.create(req.body)
  newChatroom.save(error => {
    if(error) {
      console.log(error);
    } else {
      /*find the users associated with this chatroom,
      and add this ID to their chatroom array. */
      req.body.users.forEach(user => {
        User.updateOne({
          _id: user.userID
        }, {
          $push: {
            chatrooms: {
              chatroomID: newChatroom._id,
              chatroomName: newChatroom.chatroomName
            }
          }
        })
        .then(function(chatroom) {
          //chatroom has been updated
        });
      });

      res.json({message: "Success"});
    }
  });
});

// GET route for getting all Chatboxes
app.get("/api/chatrooms/getName/:chatroomID", function(req, res) {
  const chatroomID = req.params.chatroomID;
  Message.find({ chatroomID: chatroomID })
  .then(function(dbChatroom) {
    res.json(dbChatroom);
  });
});

// GET route for getting all Chatboxes
app.get("/api/chatrooms/:id", function(req, res) {
  const id = req.params.id;
  Message.find({ chatroomID: id })
  .then(function(dbChatroom) {
    res.json(dbChatroom);
  });
});

//Provide a route that will remove the chatroom from the users chatroom list
//
//CODEHERE
//



//User APIs
app.get("/api/users/searchbyemail/:email", function(req, res) {
  const email = req.params.email
  User.findOne({email}, (error, user) => {
    ///Return if there was a database error.
    if(user) {
      res.json(user);
    } 
  });
});

//User APIs
app.get("/api/users/searchbyusername/:username", function(req, res) {
  const username = req.params.username
  User.findOne({username}, (error, user) => {
    //Return if there was a database error.
    if(user) {
      res.json(user);
    } 
  });
});

//Add a contact to the users contact list
app.post("/api/contact/add", function(req, res) {
  User.updateOne(
    {_id: req.body.currentUser._id},
    { $push:{
        contacts: {
          userID: req.body.userID,
          username: req.body.username,
          userEmail: req.body.userEmail
        } 
      }
  }).then(function(dbContacts) {
    res.json(dbContacts);
  });
})

//Provide a route that will remove a contact from the users contact list
//
//CODEHERE
//


//Recognition Posts APIs
// GET route for getting all recognition
app.get("/api/recognitions/all", function(req, res) {
  Post.find(req.body)
  .then(function(dbRecognition) {
    res.json(dbRecognition);
  });
});

// POST route for saving a new recognition
app.post("/api/recognitions", function(req, res) {
  Post.create(req.body)
    .then(function(dbRecognition) {
      res.json(dbRecognition);
    });
});

// goes to route folder (comment for now, will use later)
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

// If API routes are not used, use the React app - tells Heroku
app.use(function(request, response) {
  response.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});