import mongoose from 'mongoose';
// !update email and password for authentification
const userSchema = mongoose.Schema({ 
    username: String,
    // 
    email: String,
    // will be date object
    password: String,
    role: String
    
  });

export default mongoose.model("user", userSchema);