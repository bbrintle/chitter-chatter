import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons'
import React, { useState } from 'react';
//import axios from '../axios';
import './Chat.css';
// Messages is provided as a props, so we need to retrieve it via props and then destructure messages out of props
function Chat(props) {
    const { messages } = props;
    const [input, setInput] = useState("");

    const sendMessage = async (event) => {
        event.preventDefault();

        /*
        //Send the input as message using axios
        await axios.post('/api/messages/new', {
            message: input,
            name: "Demo App",
            timestamp: "Just now!",
            received: false,
        })
        */

        //Once axios has completed, set the input back to blank
        setInput("");
    }

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar />

                <div className='chat_headerInfo'>
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
            </div>

            <div className='chat_body'>
                {/* Here we loop through messages and create a new chat bubble for each message. if the .recieved is true,
                 the bubble will be given the className 'chat_reciever' for different styling*/}
                {messages.map(message => (
                    <p className={`chat_message ${message.received && "chat_reciever"}`}>
                    <span className='chat_name'>{message.name}</span>
                    {message.message}
                    <span className='chat_timestamp'> 
                        {message.timestamp}
                    </span>
                </p>
                ))}
                
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    {/* The value will be set to the state "input" 
                        and every time the input is changed, we will set the
                        new information to input using setInput */}
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        placeholder='Type a message' type="text" 
                    />
                    <button onClick={sendMessage} type='submit'>
                            Send a message
                    </button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat