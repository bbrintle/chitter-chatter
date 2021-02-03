import React, { useState, useContext } from 'react'
import './Profile.css'
import axios from 'axios'
import FoundContacts from "../FoundContacts/FoundContacts"
import { AuthContext } from "../../Context/AuthContext";

//Grid components
import ContainerFluid from "../ContainerFluid";
import Row from "../Row";
import Col from "../Col";

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
            <ContainerFluid>
                <h1 className="text-center my-4 main-display find-users-heading">
                    F<span className="slightly-smaller">IND</span> U<span className="slightly-smaller">SERS</span>
                </h1>
                <Row>
                    <Col size="col-lg-6">
                        <form>
                            <div className="input-group">
                                <input 
                                    type="email"
                                    value={emailInput} 
                                    onChange={e => setEmailInput(e.target.value)} type="text" 
                                    placeholder="Search by Email"
                                    className="form-control form-control-lg green-border"
                                    required
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-info btn-green fas fa-search" aria-label="Search by Email" onClick={searchForContactByEmail} >
                                    </button>
                                </div>
                            </div>
                        </form> 
                    </Col>
                    <Col size="col-lg-6">
                        <form className="mt-3 mt-lg-0">
                            <div className="input-group">
                                <input 
                                    type="text"
                                    value={usernameInput} 
                                    onChange={e => setUsernameInput(e.target.value)} type="text" 
                                    placeholder="Search by Username"
                                    className="form-control form-control-lg red-border"
                                    required
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-info btn-red fas fa-search" aria-label="Search by Username" onClick={searchForContactByUsername} >
                                    </button>
                                </div>
                            </div>
                        </form> 
                    </Col>
                </Row>
            </ContainerFluid>

            <FoundContacts users={users} show={show} currentUser={user}/>
        </>
    )
}

export default Profile
