import axios from 'axios'
import React, { useState } from 'react'
import "./FoundContacts.css"

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
        <div className='foundUserCard'>
            <p>{users.username}</p>
            <p>{users.email}</p>
            <p>{users._id}</p>
            <button onClick={() => addContact()}>Add User</button>
        </div>
    )
}

export default FoundContacts
