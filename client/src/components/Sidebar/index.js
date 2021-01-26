import { Button, ListGroup } from "react-bootstrap";
import axios from "axios"
import Pusher from "pusher-js"

// For buttons
import React, { useEffect } from 'react';
import { useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';
import MailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import SettingsIcon from '@material-ui/icons/Settings';
import Modal from "react-bootstrap/Modal"
import SideBarChatrooms from "../SideBarChatrooms/SideBarChatrooms";
import ChatroomModal from "../ChatroomModal/ChatroomModal"
import './Sidebar.css';

const Sidebar = () => {
    const [chatrooms, setChatrooms] = useState([]);
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openModal = () => {
        handleShow();
    }

    //selectedContacts = each selected contact provided in the modal
    //users.push(selectedContacts)

    const createChatroom = async () => {
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
        handlePusherChatroom();
        handleClose();
    }

    const handlePusherChatroom = () => {
        const pusher = new Pusher('02315d0fbb0283ef5f14', {
          cluster: 'us3'
        });
    
        const channelChatroom = pusher.subscribe('chatrooms');
        channelChatroom.bind('inserted', (newChatrooms) => {
          getChatrooms();
        });

        return () => {
            channelChatroom.unbind_all();
            channelChatroom.unsubscribe();
        };
      }

    //Function that handles the retrieval of getting all chatrooms currently in db.
    const getChatrooms = async() => {
        await axios.get(`/api/chatrooms/all`)
            .then(result => {
                setChatrooms(result.data);   
                console.log(chatrooms)  
            });
        
      };

    useEffect(() => {
        getChatrooms();
        handlePusherChatroom();
     }, []);
    
    return (
        <>
            <div className="sidebar-menu-wrapper">
                <ListGroup>

                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={openModal}>
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chatrooms" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FaceIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Profile" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <MailboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recognition Posts" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>

                </ListGroup>
            </div>

            <div className="sidebar-contact-wrapper">
        
                <SideBarChatrooms chatrooms={chatrooms} />

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


            </div>
        </>
    );
};

export default Sidebar;