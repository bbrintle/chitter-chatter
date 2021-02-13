import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

// Theme
import { Toggle } from "../Toggle";
import {ThemeContext} from 'styled-components';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "../NavItem";
import LogoutButton from "../LogoutButton"
import NavbarBrand from "../NavbarBrand";

const Header = (props) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const {id, setTheme} = useContext(ThemeContext);

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
        <Navbar expand="sm">
            <NavbarBrand/>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    { !isAuthenticated ? unauthenticatedNabar() : authenticatedNavbar() }
                </Nav>
                <Nav>
                <Toggle isActive={id === 'dark'} onToggle={setTheme} />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;