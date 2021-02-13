import "./recognition.css";
import profileImage from "../../images/profileImage.jpg"
// import styled from 'styled-components';
import RecSender from "../RecSender/RecSender"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Pusher from 'pusher-js';

//Grid components
import ContainerFluid from "../ContainerFluid";

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
      <ContainerFluid>
        <h1 className="text-center my-4 main-display recognitions-heading">
          R<span className="slightly-smaller">ECOGNITIONS</span>
        </h1>
        <div className="recognitions px-3 pb-4">
            <RecSender 
            recognitions={recognitions}
            handlePusher={handlePusher}/>
        </div>
      </ContainerFluid>
    )
} 

export default Recognition;