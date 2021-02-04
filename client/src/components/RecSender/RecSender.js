import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import "./RecSender.css"

function RecSender() {
    const [input, setInput] =useState(" ")

    const handleSubmit = (e) => {
        e.preventDefault();

        // add db section to get and post recognitions
        setInput("");
    };
    return (
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

                    <button onClick={handleSubmit} type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default RecSender
