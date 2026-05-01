import { useEffect, useRef, useState } from "react";
import "../styles/Header.css";
import axiosInstance from "../services/axiosInstance";
import { clearTokens, getAccessToken } from "../services/authService";
import { useNavigate } from "react-router-dom";  
import { jwtDecode } from "jwt-decode"; 

 function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [user,setUser] = useState({name:""});

  const handleLogout = async () => {
    try{
      await axiosInstance.post("/auth/logout");
    } catch(error){
      console.log("Logout API error:",error);
    } finally{
      clearTokens();
      setOpen(false);
      navigate("/");
    }
  
  };

  
  useEffect(() => {
    const token = getAccessToken();

    if(token){
      const decoded = jwtDecode(token);
      const email=decoded.sub;
      const name=email.split("@")[0];
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

      setUser({name : formattedName});
    }
  }, []);

  useEffect(() =>{
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header">

      <div className="profile-section" ref={dropdownRef}>
        <div
          className="profile"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <span>{user.name}</span>
        </div>

        {open && (
          <div className="dropdown">
            <p>My Profile</p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;