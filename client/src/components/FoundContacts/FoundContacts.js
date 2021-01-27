import axios from 'axios'
import React, { useState } from 'react'
import "./FoundContacts.css"

function FoundContacts({ users, currentUser }) {
    const [onOff, setOnOff] = useState(false);

    const addContact = async () => {

        await currentUser.contacts.forEach(contact => {
            if(users._id !== null){
               if((users._id === contact.userID)) {
                    setOnOff(true);
                }
            }
        });

        if(onOff === "false"){
            await axios.post(`/api/contact/add`, {
                userID: users._id,
                username: users.username,
                userEmail: users.email,
                currentUser: currentUser
            })
            setOnOff(false)
        } else {
            console.log("Already have this contact in contacts!")
        }
        
    }

    return (
        <div className='foundUserCard'>
            <p>{users.username}</p>
            <p>{users.email}</p>
            <p>{users._id}</p>
            <button onClick={addContact}>Add User</button>
        </div>
    )
}

export default FoundContacts
