import { ListGroup } from "react-bootstrap";
import { IndeterminateCheckBox } from "@material-ui/icons";

// For buttons
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';
import MailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import SettingsIcon from '@material-ui/icons/Settings';

const Sidebar = () => {
    const sampleUsers = ["Eric", "Michael & Alejandra", "Blake, Alejandra, Eric", "SuperTeam", "Friends"];

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
                    <ListItem button>
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
                <ListGroup>
                    <div id="chat-heading-wrapper" className="text-center yellow pt-3 pb-2">
                        <h5 className="chat-heading">CHIT CHATS</h5>
                    </div>
                    
                    {sampleUsers.map((contact, index) => {
                        return (
                            <div>
                                <ListGroup.Item 
                                    key={index} 
                                    className={
                                        `${(index + 1) % 3 === 1 ? 'red-line' : (index + 1) % 3 === 2 ? 'green-line' : 'blue-line'}`
                                    }
                                >
                                    {contact}
                                </ListGroup.Item>
                            </div>    
                        );
                    })}
                </ListGroup>
            </div>
        </>
    );
};

export default Sidebar;