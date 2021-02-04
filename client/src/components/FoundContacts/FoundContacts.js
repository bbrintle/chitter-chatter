import axios from 'axios'
import React, { useState } from 'react'
import "./FoundContacts.css"

//Grid Components
import Container from "../ContainerFluid";
import Row from "../Row";
import Col from "../Col";

function FoundContacts({ users, currentUser }) {
    // const [onOff, setOnOff] = useState("");
    let offOn = false;

    const addContact = async () => {
        // setOnOff("false")
        
        currentUser.contacts.forEach(contact => {
            if((users._id === contact.userID)) {
                offOn = true
                console.log(offOn, "This is the true trigger")
            }
        });

        if(offOn === false){
            await axios.post(`/api/contact/add`, {
                userID: users._id,
                username: users.username,
                userEmail: users.email,
                currentUser: currentUser
            }).then(() => {
                console.log("testing")
                currentUser.contacts.push({
                    userID: users._id,
                    username: users.username,
                    userEmail: users.email,
                })
                offOn = false 
               console.log(offOn)
            })
            
            
        } else {
            console.log("Already have this contact in contacts!")
        }
        
    }

    return (
        <>
            {users.username && users.email ? 
                <div className="mt-4 px-auto larger-text foundUserCard">
                    <div className="ml-5 mr-5">
                        <Container>
                            <Row>
                                <Col size="col-md-9">
                                    <Row>
                                        <Col>
                                            <i className="fas fa-user"></i>
                                            <strong> {users.username} </strong>
                                        </Col>
                                        <Col>
                                            <i>({users.email})</i>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col size="col-md-3">
                                    <button className="btn blue-button btn-block fas fa-plus" aria-label="Add User" onClick={() => addContact()}>
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div> 
                : 
                <div>
                </div>
            }
        </>
    )
}

export default FoundContacts
