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
    const sampleUsers = ["bobby", "sally", "smarty head"];

    return (
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

            {sampleUsers.map((contact, index) => {
                return (
                    <ListGroup.Item key={index}>
                        {contact}
                    </ListGroup.Item>
                );
            })}

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
    );
};

export default Sidebar;