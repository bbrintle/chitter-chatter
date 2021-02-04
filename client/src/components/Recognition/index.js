import "./recognition.css";

import React, { Component }  from 'react';
import profileImage from "../../images/profileImage.jpg"
import styled from 'styled-components';
import RecSender from "../RecSender/RecSender"
import RecPost from "../RecPost"

function Recognition() {
    return(
        <div className="recognitions">
            <RecSender />

            <RecPost 
            profilePic={profileImage}
            message="Shoutout to Michael for helping me with my routes"
            timestamp="4:01PM"
            username="areye022"
            />
            <RecPost 
            profilePic={profileImage}
            message="Eric! You're styling looks amazing! great job!"
            timestamp="4:01PM"
            username="areye022"/>
            <RecPost 
            profilePic={profileImage}
            message="Wow! Blake, you kicked butt during todays meeting!"
            timestamp="4:01PM"
            username="areye022"/>
        </div>
    )
} 

export default Recognition;