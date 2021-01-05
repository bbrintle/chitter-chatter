import Nav from "react-bootstrap/Nav";

function NavItem(props) {
    return (
        <span className={`nav-item px-3`}>
            <Nav.Link href={`/${props.tagName}`}>
                <span className="dropdown-text">
                    {props.text}
                </span>
            </Nav.Link>
        </span>
    );
}

export default NavItem;