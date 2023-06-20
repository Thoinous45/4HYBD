import {Redirect} from "react-router-dom";
import AuthService from "../services/AuthService.js";
import {useState} from "react";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const [isAuthenticated] = useState(AuthService.isAuthenticated())
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        isAuthenticated ? <Component {...rest}/> : <Redirect to="/"/>
    )
}
export default PrivateRoute;
