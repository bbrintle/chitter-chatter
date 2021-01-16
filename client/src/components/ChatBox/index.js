import { useEffect, useState } from "react";
import Container from "../Container";
import ContainerFluid from "../ContainerFluid";
import Chat from "../Chat";
import Pusher from "pusher-js"

//Include the Message Service.
import MessageService from "../../Services/MessageService";

const ChatBox = (props) => {

    const [messages, setMessages] = useState([]);

     useEffect(()=> {
      const pusher = new Pusher('dbb02b01af6775b08146', {
        cluster: 'us3'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessages) => {
        //Add newMessage to the current array of messages
        setMessages([...messages, newMessages])
      });
      console.log(messages)
      //Unbind and Unsubscribe to prevent multiple connections to pusher and insure that there is only one subscriber at a time
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
      // Make sure the useEffect updates when the 'messages' state updates
    }, [messages]);

    
    useEffect(() => {
        MessageService.getAllMessages()
            .then(result => {
                console.log("in useEffect");
                console.log(result.data);
                setMessages(result.data);
                /*
                const messagesFromResult = [];
                result.forEach(thisMessage => {
                    //THIS MIGHT BE thiMessage.data
                    messagesFromResult.push(thisMessage);
                });
                */

               // setMessages(messagesFromResult);
               //setMessages(result.data.data);
                
            });
    }, []);

    return (
        <ContainerFluid>
            <Chat messages={messages}/>
        </ContainerFluid>
    );
}

export default ChatBox;