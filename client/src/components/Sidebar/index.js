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

    const handleClose = () => {
        setInput("");
        setShow(false);
    };

    const handleShow = () => setShow(true);
    const authContext = useContext(AuthContext);
    let userContacts = authContext.user

    const openModal = () => {
        handleShow();
    }

    //selectedContacts = each selected contact provided in the modal
    //users.push(selectedContacts)

    // Pass the checkbox name to the function
    function getCheckedBoxes() {
        var checkboxes = document.getElementsByName("checkboxContacts");
        var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i < checkboxes.length; i++) {
       // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i]);
        }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
    }

    const getDefaultChatroomName = (inputs) => {
        let defaultName = "";
        inputs.forEach((input, index) => {
            defaultName +=
            input.attributes.usersName.value +
            (index === inputs.length - 1 ? '' : ', ');
        });
        return defaultName;
    }

    const createChatroom = async () => {
        //See which names are checked. These users' information will be used to add them to the chatroom.
        const checkedBoxes = getCheckedBoxes();
        const newChatroom = {
            users:[],
            chatroomName: input || getDefaultChatroomName(checkedBoxes)
        }
        checkedBoxes.forEach(input => {
            newChatroom.users.push({
                userID: input.attributes.usersID.value,
                username: input.attributes.usersName.value
            })
        })
        console.log(checkedBoxes);
        console.log(newChatroom);

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
        await axios.get(`/api/chatrooms/${userContacts._id}`)
            .then(result => {
                console.log(result);
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
                        {/* <ListItem button>
                            <ListItemIcon>
                                <StyledLink>
                                    <MailboxIcon />
                                </StyledLink>
                            </ListItemIcon>
                            <StyledLink>
                                <ListItemText primary="Posts" />
                            </StyledLink>
                        </ListItem> */}
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
                    <Modal.Title>New Chatroom</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <form>
                            <p>
                                Select who you want to create a chatroom with:
                            </p>
                            <div className='contact-list'>
                              {userContacts.contacts.map((contact, index) => (
                                <div>
                                    <input key={index} type="checkbox" id="" name="checkboxContacts" value={contact.username} usersID={contact.userID} usersName={contact.username} />
                                    <label key={index} for={contact.username}> {contact.username}</label>
                                </div>
                            ))}  
                            </div>
                            
                            <div className="input-group">
                                <input 
                                    value={input} 
                                    onChange={e => setInput(e.target.value)} 
                                    type="text" 
                                    aria-label="Provide a name for the chatroom"
                                    placeholder="Chatroom Name"
                                    className="form-control form-control-lg green-border"
                                />
                            </div>
                            
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