import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Pusher from "pusher-js";

//Export Provider and Consumer for global state.
export const RoomContext = createContext();

export default ({ children }) => {
    const [currentRoomID, setCurrentRoomID] = useState("");
    const [currentRoomName, setCurrentRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    const scrollBot = () => {
        let chatBody = document.getElementById("chat_body");
        chatBody.scrollTop = chatBody.scrollHeight;
    }
  
    //Function that handles the retrieval of getting all messages currently in db.
    const getMessages = async() => {
        await axios.get(`/api/messages/${currentRoomID}`)
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

    //Return the children wrapped with the provider of the global context (once loaded).
    return (
        <div> 
            <RoomContext.Provider value={{ currentRoomID, setCurrentRoomID, currentRoomName, setCurrentRoomName, messages, setMessages, handlePusher, getMessages }}>
                { children }
            </RoomContext.Provider>
        </div>
    );
} 