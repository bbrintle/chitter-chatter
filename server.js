import express from "express";
import mongoose from "mongoose";
// import routes from "./routes";

const app = express();
// const passport = require("./config/passport");
const PORT = process.env.PORT || 3001;

// TODO: declare pusher

// importing dotenv
import dotenv from "dotenv";
dotenv.config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
// Used to parse JSON bodies, don't need body-parser package
// Also needed for Postman to work
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/communitychatapp", 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// mongoose.connect(`mongodb://<dbuser>:<dbpassword>@ds241658.mlab.com:41658/test_db`,(err)=>{
// if(err) throw err;
// console.log(“DB Connected Successfully”);
// })

// TODO: code for Pusher
// TODO: declare mongoose.connection
// TODO: declare collection and changeStream.  Code changeStream function for "change"

// Add routes, both API and view
// Routes for user login

// Need html route for going to profile

// Routes for data (i.e. messages, recognition posts, comments on posts (sub-part)

// GET route for getting all messages
app.get("/api/messages/", function(req, res) {
  Message.findAll({})
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
// app.use(routes);

// If API routes are not used, use the React app - tells Heroku
app.use(function(request, response) {
  response.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});