import { Button, ListGroup } from "react-bootstrap";
import axios from "axios"
import Pusher from "pusher-js"

// For buttons
import React, { useContext, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import './Sidebar.css';

// Theme
import styled from 'styled-components';

const StyledLink = styled.nav`
    padding: 4px 8px;
    display: block;
    text-align: center;
    box-sizing: border-box;
    margin: auto 0;
    font-weight: ${p => p.isActive ? 'bold' : 'normal'};
    color: ${p => p.theme.bodyFontColor};
`

const SidebarColor = styled.nav`
    background: ${p => p.theme.bodyBackgroundColor};
`;

const Sidebar = () => {
    const [chatrooms, setChatrooms] = useState([]);
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const authContext = useContext(AuthContext);
    let userContacts = authContext.user

    const openModal = () => {
        handleShow();
    }

    //selectedContacts = each selected contact provided in the modal
    //users.push(selectedContacts)

    const createChatroom = async () => {
        const newChatroom = {
            users:[
                {
                    userID: "6010af55b0702341a4819709",
                    username: "bbrintle"
                },
                {
                    userID: "601b7b154274ec46446c1611",
                    username: "areye022"
                }],
            chatroomName: input
        }

        await axios.post('/api/chatrooms', newChatroom).then(message => {
            console.log(message);
        });
        //Retrieve chatrooms again.
        getChatrooms();
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
            });
        
      };

    useEffect(() => {
        getChatrooms();
        handlePusherChatroom();
     }, []);
    
    return (
        <>
             <SidebarColor>
                <div className="sidebar-menu-wrapper">
                    <ListGroup>
                        <Link to={`/dashboard/`}>
                            <ListItem button>
                                <ListItemIcon>
                                    <StyledLink>
                                        <DashboardIcon />
                                    </StyledLink>
                                </ListItemIcon>
                                <StyledLink>
                                    <ListItemText primary="Dashboard" />
                                </StyledLink>
                            </ListItem>
                        </Link>
                        <ListItem button onClick={openModal}>
                            <ListItemIcon>
                                <StyledLink>
                                    <ChatIcon />
                                </StyledLink>
                            </ListItemIcon>
                            <StyledLink>
                                <ListItemText primary="Chatrooms" />
                            </StyledLink>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StyledLink>
                                    <FaceIcon />
                                </StyledLink>
                            </ListItemIcon>
                            <StyledLink>
                                <ListItemText primary="My Profile" />
                            </StyledLink>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StyledLink>
                                    <MailboxIcon />
                                </StyledLink>
                            </ListItemIcon>
                            <StyledLink>
                                <ListItemText primary="Posts" />
                            </StyledLink>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StyledLink>
                                    <SettingsIcon />
                                </StyledLink>
                            </ListItemIcon>
                            <StyledLink>
                                <ListItemText primary="Settings" />
                            </StyledLink>
                        </ListItem>

                    </ListGroup>
                </div>
            </SidebarColor>

            <div className="sidebar-contact-wrapper">
        
                <SideBarChatrooms chatrooms={chatrooms} handlePusherChatroom={handlePusherChatroom}/>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <form>
                            <p>
                                Select who you want to create a chatroom with?
                            </p>
                            <div className='contact-list'>
                              {userContacts.contacts.map((contact, index) => (
                                <div>
                                    <input key={index} type="checkbox" id="" name={contact.username} value={contact.username} />
                                    <label key={index} for={contact.username}> {contact.username}</label>
                                </div>
                            ))}  
                            </div>
                            
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