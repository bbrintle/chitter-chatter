import { useEffect, useState } from "react";
import ContainerFluid from "../ContainerFluid";
import Chat from "../Chat";
import Pusher from "pusher-js";

import styled from 'styled-components';

//Include the Message Service.
import axios from "axios";
import { useParams } from "react-router-dom";

const HeaderWrapper = styled.nav`
    background-color: ${p => p.theme.bodyBackgroundColor};
    color: ${p => p.theme.bodyFontColor};
`;

const ChatBox = (props) => {
  // Get chat room id from params

  const { chatroomID } = useParams();

  // chat room name is not part of params so get from props (params would be cleaner)
  // const { chatroomName } = props;
  // set initial state of messages
  const [messages, setMessages] = useState([]);


  useEffect(() => {
  // I wrote an async api call function inside of useEffect to help with scoping
  async function getMessages() {
    const results = await axios.get(`/api/messages/${chatroomID}`);
    setMessages(results.data);
  }
    
    // call function to get messages, this will get called whenever the chatroom id is changed
    getMessages();
  }, [chatroomID, messages]);

  // function to setPusher for new chat room
  const setPusher = () => {
    const pusher = new Pusher("02315d0fbb0283ef5f14", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessages) => {
      console.log("Test pusher");
      console.log(chatroomID, "pusher triggered");
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
  // Chatroom id was removed as we can get it from useParams
  return (
    <HeaderWrapper>
    <ContainerFluid>
      <Chat
        messages={messages}
        handlePusher={handlePusher}
        // getMessages ={getMessages}  this is just a thought for now
        // chatroomName={chatroomName}  no longer needed as the useParams will do this in the chat component
      />
    </ContainerFluid>
    </HeaderWrapper>
  );
};

export default ChatBox;
