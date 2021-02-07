import { Avatar } from '@material-ui/core'
import React, { useContext } from 'react'
import "./ContactCard.css"
import { AuthContext } from "../../Context/AuthContext";

import Container from "../Container";
import Row from "../Row";
import Col from "../Col";

function ContactCard() {
    const { user } = useContext(AuthContext);
    return (
    <>  
        <Container>
            {user.contacts ? 
                <h1 className="text-center my-4 main-display view-contacts-heading">
                    C<span className="slightly-smaller">ONTACTS</span>
                </h1> :
                null
            }  
            <Row>
                {user.contacts.map((contact, index) => (    
                    <Col size="col-lg-4">
                        <div className={
                            `p-2 my-2 contactCard ${(index + 1) % 3 === 1 ? 'red-bg' : (index + 1) % 3 === 2 ? 'green-bg' : 'blue-bg'}`
                        }>
                            <Container>
                                <Row>
                                    <Col size="col-sm-3">
                                        <div className="mt-1">
                                            <Avatar  /> 
                                        </div>
                                    </Col>
                                    <Col size="col-sm-9">
                                        <div>
                                            <h4>{contact.username}</h4>
                                            <p>{contact.userEmail}</p>
                                        </div> 
                                    </Col>
                                </Row>
                            </Container>                        
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>    
        
    </>
    )
}

export default ContactCard
