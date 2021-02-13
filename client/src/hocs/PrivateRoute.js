import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <Route {...rest} render={props => {
            //If user is not authenticated, redirect to the login page (from this location).
            if(!isAuthenticated) {
                return <Redirect to={{ 
                    pathname: "/", 
                    state: {from: props.location}
                }}/>
            }
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;