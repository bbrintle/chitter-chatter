const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// !update email and password for authentification
const userSchema = new Schema({ 
    username: String,
    email: String,
    password: String,
    //list of all the contacts the user has added
    contacts: [
        {
            userID: String,
            username: String,
            userEmail: String,
        }
    ],
    //list of all the chatrooms the user has added
    //matches up with Message.chatroomID
    chatrooms: [
        {
            chatroomID: String,
            chatroomName: String
        }
    ],
  });

//Hash the password before saving it. 
userSchema.pre("save", function(next) {
  if(!this.isModified("password")) {
      return next();
  }
  //Hash the password using bcrypt.
  bcrypt.hash(this.password, 10, (error, hashedPassword) => {
      if(error) {
          return next(error);
      }
      this.password = hashedPassword;
      next();
  });
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
      if(error) {
          return callback(error);
      } else {
          if(!isMatch) {
              return callback(null, isMatch);
          }
          //Attach the user object with the request object.
          return callback(null, this);
      } 
  });
}

module.exports = mongoose.model("User", userSchema);