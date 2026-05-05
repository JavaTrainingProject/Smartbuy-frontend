import { Navigate } from "react-router-dom";
import { getAccessToken } from "../services/authService";

const ProtectedRoute = ({ children, allowedRoles }) =>{
    const token = getAccessToken();
    const role = localStorage.getItem("role");

    if(!token){
        return <Navigate to="/" />;
    }

    if(allowedRoles && !allowedRoles.includes(role)){
        return <Navigate to="/" />
    }

    return children;
};

export default ProtectedRoute;