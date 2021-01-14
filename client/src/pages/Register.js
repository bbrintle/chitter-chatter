import { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

//Import Components
import Container from "../components/Container";
import Message from "../components/Message";
import Header from "../components/Header";

const Register = (props) => {
    //Initialize user state.
    const [user, setUser] = useState({email: "", username: "", password: ""});
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

    /*
    const resetForm = () => {
        setUser(
            {
                email: "",
                username: "", 
                password: "", 
            }
        );
    }
    */

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
                <h3 className="text-center my-4">REGISTER</h3>
                <hr className="my-4"/>
                <div className="form-group">
                    <input type="email" name="email" onChange={handleChange} className="form-control form-control-lg" placeholder="Email" aria-label="Enter Email" disabled={disabled} required/>
                </div>
                <div className="form-group">
                    <input type="text" name="username" onChange={handleChange} className="form-control form-control-lg" placeholder="Username" aria-label="Enter Username" disabled={disabled} minLength="4" required/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" onChange={handleChange} className="form-control form-control-lg" placeholder="Password" aria-label="Enter Password" disabled={disabled} minLength="4" required/>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={disabled}>
                    SIGN UP
                </button>
            </form>
            {message ? <Message message={message}/> : null}
        </Container>
        </>
    );
};

export default Register;