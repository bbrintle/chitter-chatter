import { useEffect, useState } from "react";
import ContainerFluid from "../ContainerFluid";
import Chat from "../Chat";
import Pusher from "pusher-js"

//Include the Message Service.
import axios from "axios"
import { useParams } from "react-router-dom"


const ChatBox = (props) => {
  const { chatroomID } = useParams();
  console.log(chatroomID, "Changed ChatroomID")
  //Hold all messages in state.
  const [messages, setMessages] = useState([]);
  const [roomID, setRoomID] = useState();
  const [currentRoomID, setCurrentRoomID] = useState();

  console.log(roomID, "roomID")
  const scrollBot = () => {
      let chatBody = document.getElementById("chat_body");
      chatBody.scrollTop = chatBody.scrollHeight;
  }

  const settingRoomID = () => {
    console.log(chatroomID, "chatroom here")
    setRoomID(currentRoomID)
    console.log("HERE!!!!!!", roomID)
  }
    //Function that handles the retrieval of getting all messages currently in db.
    const getMessages = async () => {
      console.log("Something different")
      setCurrentRoomID(chatroomID)
      await axios.get(`/api/messages/${chatroomID}`)
            .then(result => {
              console.log(result.data)
                setMessages(result.data);     
            });
      scrollBot();
    };

    const handleMessages = () => {
      getMessages();
    }

    useEffect(() => {
      handleMessages();
      // settingRoomID();
            
      }, [currentRoomID])

    //This function, when called, will get all messages, then configure pusher to bind messages.
    const handlePusher = () => {
      const pusher = new Pusher('02315d0fbb0283ef5f14', {
        cluster: 'us3'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessages) => {
        console.log("Test pusher")
        // console.log(props.chatroomID, "chatroomID")
        getMessages();
        // if(newMessages.chatroomID === roomID){
        //   console.log("Check 1")
        //   getMessages();
        //   // if(newMessages._id !== messages[messages.length - 1]._id){
        //   //   console.log("Check 2")
        //   //   getMessages();
        //   // }
        // }
        
      });
      //Unbind and Unsubscribe to prevent multiple connections to pusher and insure that there is only one subscriber at a time
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }

    

    //When the page loads, get all messages and configure pusher for the first time. 
    //  useEffect(()=> {
    //     getMessages();
    //     handlePusher();
    //  }, []);

    return (
        <ContainerFluid>
            <Chat messages={messages} handlePusher={handlePusher} chatroomID={currentRoomID} chatroomName={props.chatroomName}/>
        </ContainerFluid>
    );
}

export default ChatBox;