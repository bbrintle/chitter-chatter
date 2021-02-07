import React from 'react';
import { useContext } from 'react';
import { ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./SideBarChatrooms.css";

import styled from 'styled-components';

function SideBarChatrooms({ chatrooms }) {
    return (
        <div>
            <ListGroup>
    
                    <div id="chat-heading-wrapper" className="text-center yellow pt-3 pb-2">
                        <h5 className="chat-heading">CHIT CHATS</h5>
                    </div>
                    
                    {chatrooms.map((chatroom, index) => {
                        return (
                            <Link to={`/dashboard/${chatroom.chatroomName}/${chatroom.chatroomID}`}>
                                <div>
                                    <ListGroup.Item 
                                        key={index} 
                                        className={
                                            `${(index + 1) % 3 === 1 ? 'red-line' : (index + 1) % 3 === 2 ? 'green-line' : 'blue-line'}`
                                        }
                                    >
                                        {chatroom.chatroomName}
                                    </ListGroup.Item>
                                </div>   
                            </Link> 
                        );
                    })}
            </ListGroup>
        </div>
        
    )
}

export default SideBarChatrooms
