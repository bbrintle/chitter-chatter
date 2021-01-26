import React, { useState } from 'react'
import './Profile.css'
import axios from 'axios'
import FoundContacts from "../FoundContacts/FoundContacts"

function Profile() {
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const searchForContact = (e) => {
        e.preventDefault();
        axios.get(`/api/users/${input}`)
            .then(result => {
                console.log(result)
                setUsers(result.data);     
            });
        handleShow()
    }

    return (
        <div>
            <form>
                <label>Search by Email</label>
                <input 
                    value={input} 
                    onChange={e => setInput(e.target.value)} type="text" 
                />
                <button onClick={searchForContact} >Search</button>
            </form>

            <FoundContacts users={users} show={show} />
            
        </div>
    )
}

export default Profile
