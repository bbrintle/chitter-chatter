import Nav from "react-bootstrap/Nav";

function NavItem(props) {
    return (
        <span className={`nav-item px-3${props.current === props.tagName ? ' active' : ""}`}>
            <Nav.Link href={`/${props.tagName}`}>
                <hr className="d-sm-none mb-4"/>
                <div className="text-center">
                    <span className=
                        {
                            `${props.tagName === 'login' ? 
                            'login-tab' : 
                            props.tagName === 'register' ? 
                            'register-tab' :
                            props.tagName === 'user' ?
                            'user-tab' : 
                            ''}`
                        }>
                        {props.text}
                    </span>
                </div>
            </Nav.Link>
        </span>
    );
}

export default NavItem;