import axios from 'axios'
import React, { useState } from 'react'
import "./FoundContacts.css"

function FoundContacts({ users }) {
    const [contacts, setContacts] = useState()

    // const addContact = () => {
    //     axios.post(`/api/contact/add`, function(req, res))
    // }


    // return (
    //     <div className='foundUserCard'>
    //         <p>{users.username}</p>
    //         <p>{users.email}</p>
    //         <p>{users._id}</p>
    //         <button onClick={addContact}>Add User</button>
    //     </div>
    // )
}

export default FoundContacts
