import Nav from "react-bootstrap/Nav";

function NavItem(props) {
    return (
        <span className={`nav-item px-3${props.current === props.tagName ? ' active' : ""}`}>
            <Nav.Link href={`/${props.tagName}`}>
                <hr className="d-md-none mb-4"/>
                <div className="text-center">
                    {props.text}
                </div>
            </Nav.Link>
        </span>
    );
}

export default NavItem;