import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "../NavItem";
import LogoutButton from "../LogoutButton"

const Header = (props) => {
    const { isAuthenticated, user } = useContext(AuthContext);

    //Render the navbar links when not logged in.
    const unauthenticatedNabar = () => {
        return (
            <>
                <NavItem text={"LOGIN"} tagName={"login"} current={props.current}/>
                <NavItem text={"REGISTER"} tagName={"register"} current={props.current}/>
            </>
        );
    };

    //Render navbar links when logged in.
    const authenticatedNavbar = () => {
        return (
            <>
                <NavItem text={`Welcome, ${isAuthenticated ? user.username : "GuestUser"}`} tagName={"user"} current={props.current}/>
                <LogoutButton/>
            </>
        );
    };

    return (
        <Navbar className="navbar-light bg-light p-5" expand="md">
            <Navbar.Brand href="/"><span className="larger-spacing larger-text font-light">COMMUNITY CHAT APP</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    { !isAuthenticated ? unauthenticatedNabar() : authenticatedNavbar() }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;