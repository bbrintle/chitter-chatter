import mongoose from 'mongoose';
import bcrypt from "bcrypt";

// !update email and password for authentification
const userSchema = mongoose.Schema({ 
    username: String,
    // 
    email: String,
    // will be date object
    password: String,
    role: String
    
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

export default mongoose.model("user", userSchema);