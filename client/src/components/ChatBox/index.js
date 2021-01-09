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

                const messagesFromResult = [];
                result.forEach(thisMessage => {
                    //THIS MIGHT BE thiMessage.data
                    messagesFromResult.push(thisMessage);
                });

                setMessages(messagesFromResult);
                console.log(messages);
            });
    }, []);

    return (
        <ContainerFluid>
            <Chat messsages={messages}/>
        </ContainerFluid>
    );
}

export default ChatBox;