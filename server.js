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
  appId: "1136458",
  key: "dbb02b01af6775b08146",
  secret: "2527b07cab60f9376461",
  cluster: "us3",
  useTLS: true
});

//Include user model
const User = require("./models/User");
const Message = require("./models/Message");

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
const connection_url= "mongodb+srv://admin:pCD1y7lL0Gyf4rTO@cluster0.3x99c.mongodb.net/communitychatapp?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


// TODO: code for Pusher
const db=mongoose.connection

// This will trigger once the mongoose DB has been opened
db.once('open', ()=>{
  console.log('BD connected')

  // messagecontent refers to the collection in mongoDB (from dbMessage.js)
  const msgCollection = db.collection('messages')
  // changeStream is a method that allows us to watch mongoDB
  const changeStream = msgCollection.watch()
  
  // Using the .watch() from changeStream, we check to see if the DB has had any changes, and then save that change to the variable "change"
  changeStream.on('change', (change) => {
    console.log(change)
      // If the operationType from the change is "insert", pusher will then trigger and send back the Name, Message, Timestap, and Received
      if(change.operationType === 'insert') {
          //fullDocument is the area that provides the message _Id, Name, Message, Timestamp, and Reveicved. Save it to the variable "messageDetails"
          const messageDetails = change.fullDocument;
          // Trigger pusher and use the 'messages' channel and set the Event to 'inserted' to add the messageDetails
          pusher.trigger('messages', 'inserted',
              {
                  name: messageDetails.name,
                  message: messageDetails.message,
                  timestamp: messageDetails.timestamp,
                  received: messageDetails.received
              }
          );
      } else {
          console.log("Error triggering Pusher")
      }
  })
})
// TODO: declare mongoose.connection
// TODO: declare collection and changeStream.  Code changeStream function for "change"

// Add routes, both API and view
// Routes for user login

// Need html route for going to profile

// Routes for data (i.e. messages, recognition posts, comments on posts (sub-part)


/*
//-----AUTH ROUTES----

//When logging in, use the user ID to return a JWT token.
const signToken = userID => {
  return JWT.sign({
      //Set issuer to our secret; Set subject to our user name.
      iss: process.env.JWT_SECRET,
      sub: userID
  }, process.env.JWT_SECRET, {expiresIn: "1hr"});
};

//Register a new user.
app.post("/register", (request, response) => {
  //Pull out the credential information from the request body.
  const { username, password, email } = request.body;
  //See if this username exists.
  User.findOne({username}, (error, user) => {
      if(error) {
          //If there was an error, indicate that something went wrong.
          response.status(500).json(
              {
                  message: {
                      msgBody: "An error occured while searching for username.", 
                      msgError: true
                  }
              }
          );
      }
      if(user) {
          //If the user exists (and therefore user object is returned):
          response.status(400).json(
              {
                  message: {
                      msgBody: "An error occured", 
                      msgError: true
                  }
              }
          );
      } else {
          //Otherwise, create the user using the new credentials.
          const newUser = new User({email, username, password});
          console.log(newUser);
          newUser.save(error => {
              if(error) {
                  console.log(error);
                  response.status(500).json(
                      {
                          message: {
                              msgBody: "An error occured while registering user.", 
                              msgError: true
                          }
                      }
                  );
              } else {
                  response.status(200).json(
                      {
                          message: {
                              msgBody: "Successfully registered new user.",
                              msgError: false
                          }
                      }
                  )
              }
          });
      }
  })
});

//Log an existing user in (must authenticate).
app.post("/login", passport.authenticate("local", {session: false}), (request, response) => {
  if(request.isAuthenticated()) {
      //If the user is authenticated, pull out the credentials of that user.
      const { _id, username } = request.user;
      //Create a JWT token since we have signed in.
      const token = signToken(_id);
      //Using the JWT token, set cookie and send authorization.
      response.cookie("access_token", token, {httpOnly: true, sameSite: true});
      response.status(200).json(
          {
              isAuthenticated: true, 
              user: { username }
          }
      );
  } else {
      response.status(401).json(
          {
              message: {
                  msgBody: "Incorrect username or password.",
                  msgError: true
              }
          }
      );
  }
});

//Log a user out using the associated access token.
app.get("/logout", passport.authenticate("jwt", {session: false}), (request, response) => {
  response.clearCookie("access_token");
  response.json(
      {
          user: {
              username: ""
          }, 
          success: true
      }
  );
});

//Allow the user to remain authenticated.
app.get("/authenticated", passport.authenticate("jwt", {session: false}), (request, response) => {
  const { username } = request.user;
  response.status(200).json(
      {
          isAuthenticated: true,
          user: { username }
      }
  );
});

//-----
*/

// GET route for getting all messages
app.get("/api/messages/all", function(req, res) {
  Message.find(req.body)
  .then(function(dbMessage) {
    res.json(dbMessage);
  });
});

// GET route for getting a single message
app.get("/api/messages/:id", function(req, res) {
  Message.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(function(dbMessage) {
      res.json(dbMessage);
    });
});

// POST route for saving a new message
app.post("/api/messages", function(req, res) {
  console.log(req.body);
  Message.create(req.body)
    .then(function(dbMessage) {
      res.json(dbMessage);
    });
});

// DELETE route for deleting messages
app.delete("/api/messages/:id", function(req, res) {
  Message.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function(dbMessage) {
      res.json(dbMessage);
    });
});

// PUT route for updating messages
// ? should this be updateOne or update Many?
app.put("/api/messages", function(req, res) {
  Message.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbMessage) {
      res.json(dbMessage);
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