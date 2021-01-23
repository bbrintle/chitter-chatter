import { useEffect, useState } from "react";
import Container from "../Container";
import ContainerFluid from "../ContainerFluid";
import Chat from "../Chat";
import Pusher from "pusher-js"

//Include the Message Service.
import MessageService from "../../Services/MessageService";

const ChatBox = (props) => {

    //Hold all messages in state.
    const [messages, setMessages] = useState([]);

  const scrollBot = () => {
      let chatBody = document.getElementById("chat_body");
      chatBody.scrollTop = chatBody.scrollHeight;
  }

    //Function that handles the retrieval of getting all messages currently in db.
    const getMessages = async() => {
      await MessageService.getAllMessages()
            .then(result => {
                setMessages(result.data);     
            });

      scrollBot();
    };

  
    
    //This function, when called, will get all messages, then configure pusher to bind messages.
    const handlePusher = () => {
      const pusher = new Pusher('02315d0fbb0283ef5f14', {
        cluster: 'us3'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessages) => {
        getMessages();
      });
      //Unbind and Unsubscribe to prevent multiple connections to pusher and insure that there is only one subscriber at a time
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
      // Make sure the useEffect updates when the 'messages' state updates
    }

    //When the page loads, get all messages and configure pusher for the first time. 
     useEffect(()=> {
        getMessages();
        handlePusher();
     }, []);

    return (
        <ContainerFluid>
            <Chat messages={messages} handlePusher={handlePusher}/>
        </ContainerFluid>
    );
}

export default ChatBox;