import "./recognition.css";
import profileImage from "../../images/profileImage.jpg"
// import styled from 'styled-components';
import RecSender from "../RecSender/RecSender"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Pusher from 'pusher-js';


function Recognition() {
    const [recognitions, setRecognitions] = useState([]);


  useEffect(() => {
  // I wrote an async api call function inside of useEffect to help with scoping
  async function getRecognitions() {
    const results = await axios.get(`/api/recognitions/all`);
    setRecognitions(results.data);
  }
    
    // call function to get messages, this will get called whenever the chatroom id is changed
    getRecognitions();
  }, [recognitions]);

  // function to setPusher for new chat room
  const setPusher = () => {
    const pusher = new Pusher("02315d0fbb0283ef5f14", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("posts");
    channel.bind("inserted", (newRecognitions) => {
    });
    //Unbind and Unsubscribe to prevent multiple connections to pusher and insure that there is only one subscriber at a time
    return () => {
      // getMessages() future use, may move getMessages out of useEffect
      channel.unbind_all();
      channel.unsubscribe();
    };
  };
  //This function, when called, will execute setPusher()
  function handlePusher() {
    setPusher();
  }

    return(
        <div className="recognitions">
            <RecSender 
            recognitions={recognitions}
            handlePusher={handlePusher}/>

            {/* <RecPost 
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
            username="areye022"/> */}
        </div>
    )
} 

export default Recognition;