import { Avatar } from '@material-ui/core'
import { InsertEmoticon, Mic } from '@material-ui/icons'
import React, { useState, useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import './Chat.css';
import { useParams } from 'react-router';

// Theme
import styled, {ThemeContext} from 'styled-components';

//Components for grid
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";

// Emojis
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';

const ChatWrapper = styled.header`
    background-color: ${p => p.theme.secondaryColor};
    color: ${p => p.theme.secondaryBodyFontColor};
    flex: 1;
    overflow: scroll;
    padding: 30px;
    max-height: 600px;
    border: 1px solid white;
`;

// Messages is provided as a props, so we need to retrieve it via props and then destructure messages out of props
function Chat(props) {
    const { messages } = props;
    const [input, setInput] = useState("");
    const authContext = useContext(AuthContext);
    // Obtain chatroom id from useParams
    // useParams destructing is returning undefined
    //  const { chatroomName, chatroomID}= useParams;
    // This works, maybe URL structure???
     const chat = useParams()
     const {chatroomID, chatroomName} = chat

    //  const {chatroomName} = props
    // const lastSeen = messages[messages.length - 1].timeStamp;
// I am thinking that this should be in the Chatbox component, so we can set the message state and force a render of the chat box.
    const scrollBot = () => {
        let chatBody = document.getElementById("chat_body");
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    const sendMessage = async (event) => {
        event.preventDefault();
        const currentTime = new Date().toUTCString();
        //Send the input as message using axios
        await axios.post('/api/messages', {
            message: input,
            name: authContext.user.username,
            timeStamp: currentTime,
            senderID: authContext.user._id,
            chatroomID:chatroomID //chatroom id comes from use Params now, not props
        }).then(() =>  props.handlePusher()); // call the function after axios returns its promise
        scrollBot();
        //Once axios has completed, set the input back to blank
        setInput("");
    }

    return (
        <div className='chat'>

            <div className="chat_header mt-4 mt-sm-0">
                <Avatar />
                <div className='chat_headerInfo'>
                    <h3>{chatroomName}</h3>
                </div>
            </div>

            <ChatWrapper>
            <div id='chat_body'>
                {/* Here we loop through messages and create a new chat bubble for each message. if the .recieved is true,
                 the bubble will be given the className 'chat_reciever' for different styling*/}
                {messages.map((message, index) => (
                    <>
                        <p key={index} className={`chat_message ${message.senderID === authContext.user._id ? "chat_reciever" : ""}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <span className='chat_timestamp'> 
                            {message.timeStamp}
                        </span>
                        </p>
                    </>
                ))
                }
            </div>
            </ChatWrapper>

            <div className="chat_footer">
                {/* {<InsertEmoticon />} */}
                <form className="my-4">
                    <Container>
                        <Row>
                            <Col size="col-lg-8 col-xl-9">
                                <div className="form-group">
                                    {/* The value will be set to the state "input" 
                                    and every time the input is changed, we will set the
                                    new information to input using setInput */}
                                    <input 
                                        value={input} 
                                        onChange={e => setInput(e.target.value)} 
                                        placeholder='Type a message' type="text" 
                                        className="form-control form-control-lg"
                                        id="chat-input"
                                    />

                                    {/*<Mic />*/}

                                    <div className="mt-4">
                                        <Emoji emoji={{ id: 'office' }} size={35} />{" "}
                                        <Emoji emoji={{ id: 'briefcase' }} size={35} />{" "}
                                        <Emoji emoji={{ id: 'clock3' }} size={35} />{" "}
                                        <Emoji emoji={{ id: 'card_index_dividers' }} size={35} />{" "}
                                        <Emoji emoji={{ id: 'bar_chart' }} size={35} />{" "}
                                        <Emoji emoji={{ id: 'card_index' }} size={35} />{" "}
                                        <Emoji emoji={{ id: 'desktop_computer' }} size={35} />
                                    </div>
                                
                                </div>
                            </Col>

                            <Col size="col-lg-4 col-xl-3">
                                <button className="btn btn-outline-info btn-block btn-larger" onClick={sendMessage} type='submit'>
                                    Send <i className="fas fa-paper-plane ml-2"></i>
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </form>
                
            </div>

        </div>
    )
}

export default Chat