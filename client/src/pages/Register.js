import { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";

//Import Components
import Container from "../components/Container";
import Message from "../components/Message";
import Header from "../components/Header";

// Theme
import styled from 'styled-components';

const RegisterTheme = styled.nav`
    color: ${p => p.theme.bodyFontColor};
    /* background: ${p => p.theme.bodyBackgroundColor}; */
`

const Register = (props) => {
    //Initialize user state.
    const [user, setUser] = useState({email: "", username: "", password: "", contacts: [], chatrooms: []});
    //Initialize message state.
    const [message, setMessage] = useState(null);
    //Set input fields to enabled by default until logged in.
    const [disabled, setDisabled] = useState(false);

    //Create a reference for the timer.
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    //When the input changes, set the username/password to the current value.
    const handleChange = (event) => {
        event.preventDefault();
        setUser(
            {
                ...user, 
                [event.target.name] : event.target.value
            }
        );
    }

    //Handle when the form is submitted.
    const handleSubmit = (event) => {
        event.preventDefault();
        //Send user information to sign up.
        AuthService.register(user).then(data => {
            //After registering, get the message returned back.
            const { message } = data;
            setMessage(message);
            //Reset the form.
            //resetForm();
            //As long as there is no error, set the timer for 2 seconds to redirect to login page after registering.
            if(!message.msgError) {
                setDisabled(true);
                timerID = setTimeout(() => {
                    props.history.push("/login");
                }, 2000);
            }
        });
    };

    return (
        <>
        <Header/>
        <Container>
            <form className="mt-5" onSubmit={handleSubmit}>
                <h1 className="text-center my-4 display-1 main-display">
                    <RegisterTheme>
                    S<span className="slightly-smaller">IGN</span> U<span className="slightly-smaller">P</span>
                    </RegisterTheme>
                </h1>
                <hr className="mt-3 mb-5"/>
                <div className="form-group my-4">
                    <input type="email" name="email" onChange={handleChange} className="form-control form-control-lg pink-border input-credentials" placeholder="Email" aria-label="Enter Email" disabled={disabled} required/>
                </div>
                <div className="form-group my-4">
                    <input type="text" name="username" onChange={handleChange} className="form-control form-control-lg pink-border input-credentials" placeholder="Username" aria-label="Enter Username" disabled={disabled} minLength="4" required/>
                </div>
                <div className="form-group my-4">
                    <input type="password" name="password" onChange={handleChange} className="form-control form-control-lg pink-border input-credentials" placeholder="Password" aria-label="Enter Password" disabled={disabled} minLength="4" required/>
                </div>
                
                <button className="btn btn-lg btn-block pink-button" type="submit" disabled={disabled}>
                    L<span className="slightly-smaller">ET'S</span> G<span className="slightly-smaller">O</span>! <i className="far fa-running ml-2"></i>
                </button>
                <hr className="hr-light mt-4 mb-5"/>
            </form>
            {message ? <Message message={message}/> : null}
        </Container>
        </>
    );
};

export default Register;