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

    //Function that handles the retrieval of getting all messages currently in db.
    const getMessages = async() => {
      await MessageService.getAllMessages()
            .then(result => {
                console.log("in useEffect");
                console.log(result.data);
                setMessages(result.data);     
            });
    };
    
    //This function, when called, will get all messages, then configure pusher to bind messages.
    const handlePusher = () => {
      const pusher = new Pusher('02315d0fbb0283ef5f14', {
        cluster: 'us3'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessages) => {
        //Add newMessage to the current array of messages
        //setMessages([...messages, newMessages])
        //Get messages again.
        getMessages();
      });
      console.log(messages)
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