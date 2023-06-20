import {useState} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/AuthService";

const IsAuthRoute = ({ component: Component, ...rest }: any) => {
    const [isAuthenticated] = useState(AuthService.isAuthenticated())
    return(
        // eslint-disable-next-line react/react-in-jsx-scope
        isAuthenticated ? <Redirect to="/app"/> : <Component {...rest}/>
    )
}

export default IsAuthRoute
