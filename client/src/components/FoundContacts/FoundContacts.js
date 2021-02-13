import axios from 'axios'
import React from 'react'
import "./FoundContacts.css"

//Grid Components
import Container from "../ContainerFluid";
import Row from "../Row";
import Col from "../Col";

function FoundContacts({ users, currentUser }) {
    let offOn = false;

    const addContact = async () => {   
        currentUser.contacts.forEach(contact => {
            if((users._id === contact.userID)) {
                offOn = true
            }
        });

        //need a conditional here that checks if the users._id is equal to the user ID of the current user. 
        //we do not want to add ourselves to our contacts list.

        if(offOn === false){
            await axios.post(`/api/contact/add`, {
                userID: users._id,
                username: users.username,
                userEmail: users.email,
                currentUser: currentUser
            }).then(() => {
                currentUser.contacts.push({
                    userID: users._id,
                    username: users.username,
                    userEmail: users.email,
                })
                offOn = false 
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
                //Possibly have a widow that open and provides a scrolable box of all users???
                //What is a better method for showing users on the site?
                <div>
                </div>
            }
        </>
    )
}

export default FoundContacts
