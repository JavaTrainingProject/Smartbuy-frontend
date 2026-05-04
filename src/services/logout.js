import { logoutUser } from "./authService";
import { clearTokens } from "./authService";

export const handleLogout = async (navigate) =>{
    try{
        await logoutUser();
    } catch(error){
        console.log("Logout API error:", error);
    } finally{
        clearTokens();
        navigate("/");
    }
};