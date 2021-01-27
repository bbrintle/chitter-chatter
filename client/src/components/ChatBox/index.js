import { useEffect, useState } from "react";
import ContainerFluid from "../ContainerFluid";
import Chat from "../Chat";
import Pusher from "pusher-js"

//Include the Message Service.
import axios from "axios"

const ChatBox = (props) => {

  //Hold all messages in state.
  const [messages, setMessages] = useState([]);
  const [roomID, setRoomID] = useState("");
  
  const scrollBot = () => {
      let chatBody = document.getElementById("chat_body");
      chatBody.scrollTop = chatBody.scrollHeight;
  }

    //Function that handles the retrieval of getting all messages currently in db.
    const getMessages = async() => {
      await axios.get(`/api/messages/${props.chatroomID}`)
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
    }

    // useEffect(() => {
    //   if(roomID !== props.chatroomID){
    //     setRoomID(props.chatroomID)
    //     getMessages();
    //   }

    // }, [props.chatroomID])

    //When the page loads, get all messages and configure pusher for the first time. 
     useEffect(()=> {
        getMessages();
        handlePusher();
     }, []);

    return (
        <ContainerFluid>
            <Chat messages={messages} handlePusher={handlePusher} chatroomID={props.chatroomID} chatroomName={props.chatroomName}/>
        </ContainerFluid>
    );
}

export default ChatBox;