const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { request, response } = require("express");

//When logging in, use the user ID to return a JWT token.
const signToken = userID => {
    return JWT.sign({
        //Set issuer to our secret; Set subject to our user name.
        iss: process.env.JWT_SECRET,
        sub: userID
    }, process.env.JWT_SECRET, {expiresIn: "1hr"});
};

//Register a new user.
authRouter.post("/register", (request, response) => {
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
authRouter.post("/login", passport.authenticate("local", {session: false}), (request, response) => {
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
authRouter.get("/logout", passport.authenticate("jwt", {session: false}), (request, response) => {
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
authRouter.get("/authenticated", passport.authenticate("jwt", {session: false}), (request, response) => {
    const { username } = request.user;
    response.status(200).json(
        {
            isAuthenticated: true,
            user: { username }
        }
    );
});

module.exports = authRouter;