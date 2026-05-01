import { Navigate } from "react-router-dom";
import { getAccessToken } from "../services/authService";

const ProtectedRoute = ({ children }) =>{
    const token = getAccessToken();

    if(!token){
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;