import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import NavItem from "../NavItem";

function Header(props) {
    return (
            <Navbar className="navbar-dark bg-dark" expand="md">
                <Navbar.Brand className="px-3 pt-2" href="/">LOGO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavItem text={"Home"} tagName={'home'}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
}

export default Header;