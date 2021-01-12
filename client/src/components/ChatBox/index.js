import { useEffect, useState } from "react";
import Container from "../Container";
import ContainerFluid from "../ContainerFluid";
import Chat from "../Chat";

//Include the Message Service.
import MessageService from "../../Services/MessageService";

const ChatBox = (props) => {

    const [messages, setMessages] = useState([]);

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