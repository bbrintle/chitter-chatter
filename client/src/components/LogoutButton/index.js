import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";

import Nav from "react-bootstrap/Nav";

const LogoutButton = () => {

    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    //Handle logging the user out.
    const handleLogOut = () => {
        //Using the logout function in AuthService, log the user out.
        AuthService.logout().then(data => {
            //From server, we will now have an empty user, so we want to update the global state.
            if(data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    };

    return (
        <span className="nav-item px-3">
            <Nav.Link onClick={handleLogOut} href="/">
                <div className="text-center logout-tab">
                    <hr className="d-sm-none"/>
                    LOGOUT
                </div>
            </Nav.Link>
        </span>
    );
}

export default LogoutButton;