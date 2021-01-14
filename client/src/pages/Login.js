import { useState, useContext, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

//Import Components
import Container from "../components/Container";
import Message from "../components/Message";
import Header from "../components/Header";

const Login = (props) => {
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

    const authContext = useContext(AuthContext);

    //When the input changes, set the username/password to the current value.
    const handleChange = (event) => {
        event.preventDefault();
        setUser(
            {
                ...user, 
                [event.target.name] : event.target.value
            }
        );
        console.log(user);
    }

    //Handle when the form is submitted.
    const handleSubmit = (event) => {
        event.preventDefault();
        //Send user information to log in.
        AuthService.login(user).then(data => {
            //Once returned, pull out the needed data from the response.
            const { isAuthenticated, user, message } = data;
            if(isAuthenticated) {
                //Update global context with user information.
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                //Once authenticated, redirect to books for current user.
                setMessage({
                    msgBody: "Success! Logging in...",
                    msgError: false
                });

                setDisabled(true);

                timerID = setTimeout(() => {
                    props.history.push("/dashboard");
                }, 10);
            } else {
                //Otherise, set an error message.
                setMessage(message);
                console.log(data);
            }
        });
    };

    return (
        <>
        <Header/>
        <Container>
            <form className="mt-5" onSubmit={handleSubmit}>
                <h3 className="text-center my-4">SIGN IN</h3>
                <hr className="my-4"/>
                <div className="form-group">
                    <input type="text" name="username" onChange={handleChange} className="form-control form-control-lg" placeholder="Username" aria-label="Enter Username" disabled={disabled} required/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" onChange={handleChange} className="form-control form-control-lg" placeholder="Password" aria-label="Enter Password" disabled={disabled} required/>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={disabled}>
                    LOG IN
                </button>
            </form>
            {message ? <Message message={message}/> : null}
        </Container>
        </>
    );
};

export default Login;