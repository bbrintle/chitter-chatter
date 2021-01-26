import { Button, ListGroup } from "react-bootstrap";
import axios from "axios"
import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal"

const ChatroomModal = (props) => {
    const [chatrooms, setChatrooms] = useState([]);
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("");
    const handleClose = () => setShow(false);
    setShow(props.show)


    //selectedContacts = each selected contact provided in the modal
    //users.push(selectedContacts)

    const createChatroom = async (event) => {
        event.preventDefault();
        const newChatroom = {
            users:[
                {
                    userID: "600b59fdf4efac552861fa25",
                    username: "bbrintle"
                },
                {
                    userID: "6003678b7413fe4934370d53",
                    username: "areye022"
                }],
            chatroomName: input
        }
        await axios.post('/api/chatrooms', newChatroom);

        props.handlePusherChatroom();
        handleClose();
        setInput("");
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <form>
                        <label>Please provide a name for the chatroom:</label>
                        <input 
                            value={input} 
                            onChange={e => setInput(e.target.value)} type="text" 
                        />
                    </form>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={createChatroom}>
                    Create Chatroom!
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChatroomModal;