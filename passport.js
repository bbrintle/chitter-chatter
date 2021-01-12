//Configure Passport and JSON Web Tokens.
//const passport = require("passport");
import passport from "passport";
//const LocalStrategy = require("passport-local").Strategy;
import LocalStrategy from "passport-local";
LocalStrategy.Strategy;
//const JwtStrategy = require("passport-jwt").Strategy;
import JwtStrategy from "passport-jwt";
JwtStrategy.Strategy;

//Include User Model
//const User = require("./models/User");
import User from "./models/User";

//Extract JWT token from request.
const cookieExtractor = request => {
    let token = null;
    if(request && request.cookies) {
        token = request.cookies["access_token"];
    }
    return token;
}

//Authorize user.
passport.use(new JwtStrategy({
    //Extract JWT token from request and verify that it is legitimate with secret key.
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
    //Using the returned data (payload within JWT token), find correct user with primary key of user (payload.sub).
    User.findById({_id: payload.sub}, (error, user) => {
        if(error) {
            //If there is an error, return error.
            return done(error, false);
        }
        if(user) {
            //If no error, return without an error and return user.
            return done(null, user);
        } else {
            //Otherwise, if no error and no user, return without user.
            return done(null, false);
        }
    });
}));

//Middleware to authenticate using username and password when logging in.
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (error, user) => {
        //Return if there was a database error.
        if(error) {
            return done(error);
        }
        //Return if no matching user exists.
        if(!user) {
            return done(null, false);
        }
        //Check if password is correct.
        user.comparePassword(password, done);
    });
}));