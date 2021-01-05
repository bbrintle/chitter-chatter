const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const passport = require("./config/passport");
const PORT = process.env.PORT || 3001;

require("dotenv").config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// todo add dbname
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/", 
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


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});