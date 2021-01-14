import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

//This component redirects a user to the home page if they are already logged in (cannot access login or register page while already logged in).
const PublicRoute = ({component: Component, ...rest}) => {
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <Route {...rest} render={props => {
            //If user is not authenticated, redirect to the login page (from this location).
            if(isAuthenticated) {
                return <Redirect to={{ 
                    pathname: "/dashboard", 
                    state: {from: props.location}
                }}/>
            }
            return <Component {...props}/>
        }}/>
    )
}

export default PublicRoute;