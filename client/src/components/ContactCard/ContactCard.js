import { Avatar } from '@material-ui/core'
import React, { useContext } from 'react'
import "./ContactCard.css"
import { AuthContext } from "../../Context/AuthContext";


function ContactCard() {
    const { user } = useContext(AuthContext);
    return (
    <>        
        {user.contacts.map((contact, index) => (
            <div className={
                `contactCard ${(index + 1) % 3 === 1 ? 'red-bg' : (index + 1) % 3 === 2 ? 'green-bg' : 'blue-bg'}`}>

                <div className="avatar">
                    <Avatar  /> 
                </div>

                <div className='contactInfo'>
                    <h4>{contact.username}</h4>
                    <p>{contact.userEmail}</p>  
                </div>
                
            </div>
        ))}
    </>
    )
}

export default ContactCard
