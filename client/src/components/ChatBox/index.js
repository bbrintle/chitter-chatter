import { useEffect, useState, useContext } from "react";
import ContainerFluid from "../ContainerFluid";
import Chat from "../Chat";
import Pusher from "pusher-js";
import { RoomContext } from "../../Context/RoomContext";

//Include the Message Service.
import axios from "axios"
import { useParams } from "react-router-dom"

const ChatBox = (props) => {

    const roomContext = useContext(RoomContext);

    useEffect(() => {
      roomContext.getMessages();
    }, [roomContext.currentRoomID]);

    return (
        <ContainerFluid>
            <Chat/>
        </ContainerFluid>
    );
}

export default ChatBox;