import { useState, useEffect } from "react";
import { getAccessToken } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import "../styles/Profile.css";
import { getUserById, updateUserProfile } from "../services/userService";
import Toast from "../components/Toast";

function UserProfile(){
    const [user, setUser] = useState({
        fullName: "",
        email:""
    });
    const [toast, setToast] = useState({
        message:"",
        type:"",
        show:false
    });
     
    const [userId, setUserId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() =>{
        const fetchUser = async() =>{
            try{
                const id = localStorage.getItem("userId");
                if(!id) return;

                setUserId(id);
                const userData = await getUserById(id);
            
                setUser({
                    fullName: userData.user_name,
                    email: userData.email
                });
            } catch(error){
                console.log("Failed to fetch user",error);
            }
        };
        fetchUser();
    },[]);

    const handleChange =(e) =>{
          setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleEdit = () => setIsEditing(true);

    const handleSave = async() =>{
        try{
            const payload = {
                name: user.fullName,
                email: user.email
            };

        await updateUserProfile(userId,payload);

        localStorage.setItem("fullName", user.fullName);
        
        setIsEditing(false);
        setToast({
        message: "Profile updated successfully",
        type: "success",
        show: true
    });
        } catch(error){
             setToast({
            message: error.response?.data?.message || "Update failed",
            type: "error",
            show: true
        });
        }
        setTimeout(() => {
        setToast({ message: "", type: "", show: false });
        }, 3000);
    };

    return(
        <div className="profile-container">
            <h2>My Profile</h2>

            <div className="profile-field">
                <label>Full Name</label>
                <input name="fullName" value={user.fullName} onChange={handleChange} disabled={!isEditing} />

            </div>

            <div className="profile-field">
                <label>Email</label>
                <input name="email" value={user.email} disabled />
            </div>

           <div className="profile-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>

            <button onClick={handleSave}>Save</button>
            {toast.show && (
             <Toast message={toast.message} type={toast.type} />
            )}
           </div>
        </div>
    );
}

export default UserProfile;