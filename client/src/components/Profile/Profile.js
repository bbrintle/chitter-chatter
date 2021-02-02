import React, { useState, useContext } from 'react'
import './Profile.css'
import axios from 'axios'
import FoundContacts from "../FoundContacts/FoundContacts"
import { AuthContext } from "../../Context/AuthContext";

function Profile() {
    const [emailInput, setEmailInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);
    const { user } = useContext(AuthContext);

    const handleShow = () => setShow(true);

    const searchForContactByEmail = (e) => {
        e.preventDefault();
        axios.get(`/api/users/searchbyemail/${emailInput}`)
            .then(result => {
                console.log(result)
                setUsers(result.data);     
            });
        handleShow()
    }

    const searchForContactByUsername = (e) => {
        e.preventDefault();
        axios.get(`/api/users/searchbyusername/${usernameInput}`)
            .then(result => {
                console.log(result)
                setUsers(result.data);     
            });
        handleShow()
    }

    return (
        <>
            <div>
                <form>
                    <label>Search by Email</label>
                    <input 
                        value={emailInput} 
                        onChange={e => setEmailInput(e.target.value)} type="text" 
                    />
                    <button onClick={searchForContactByEmail} >Search</button>
                </form>
                
            </div>

            <div>
                <form>
                    <label>Search by Username</label>
                    <input 
                        value={usernameInput} 
                        onChange={e => setUsernameInput(e.target.value)} type="text" 
                    />
                    <button onClick={searchForContactByUsername} >Search</button>
                </form>

            </div>

            <FoundContacts users={users} show={show} currentUser={user}/>
        </>
    )
}

export default Profile
