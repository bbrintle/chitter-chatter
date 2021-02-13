import { Avatar } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import "./RecSender.css"
import axios from 'axios'

//Grid Components
import ContainerFluid from "../ContainerFluid";
import Row from "../Row";
import Col from "../Col";

function RecSender(props) {
    const { recognitions } = props;
    const [input, setInput] =useState("")
    const authContext = useContext(AuthContext)

    const sendRecognition = async (event) => {
        event.preventDefault();
        const currentTime = new Date().toUTCString();
        //Send the input as message using axios
        await axios.post('/api/recognitions', {
            name: authContext.user.username,
            recognitions:input,
            timeStamp: currentTime,
            senderID: authContext.user._id,
            }).then(() =>  props.handlePusher()); // call the function after axios returns its promise
        //Once axios has completed, set the input back to blank
        // add db section to get and post recognitions
        
        setInput("");
    
    };
    return (
        <div>
            <div className="recSender">
                <div className="recSender-Heading">
                </div>
                <div className= "recSender__top">
                    <Avatar />
                    <form>
                        <input 
                        value={input}
                        onChange={(e)=> setInput(e.target.value)}
                        className="recSender__input"
                        placeholder="Let's hype up our team!"/>

                        <button onClick={sendRecognition} type="submit">submit</button>
                    </form>
                </div>
            </div>
            <div className='recognitions'>
                {
                    recognitions.map((recognitions, index) => (
                        <div className={`recPost ${(index + 1) % 3 === 1 ? 'redbg' : (index + 1) % 3 === 2 ? 'greenbg' : 'bluebg'}`
                        }>
                            <ContainerFluid>
                                <Row>
                                    <Col size="col-lg-4">
                                        <div key = {index} className="post_top">
                                            <Avatar 
                                            className="post_avatar" />
                                            <div className="post_topInfo">
                                                <h3>{recognitions.name}</h3>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col size="col-lg-8">
                                        <div className="post_bottom">
                                            <p>{recognitions.recognitions}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </ContainerFluid>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RecSender
