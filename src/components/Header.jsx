import { useEffect, useRef, useState } from "react";
import "../styles/Header.css";
import axiosInstance from "../services/axiosInstance";
import { getAccessToken, clearTokens } from "../services/authService";
import { useNavigate } from "react-router-dom";  

import { getUserById } from "../services/userService";

 function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
const storedName = localStorage.getItem("fullName");

const [user, setUser] = useState({
  name:
    storedName &&
    storedName !== "undefined" &&
    storedName !== "null"
      ? storedName
      : ""
});

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

    const storedName = localStorage.getItem("fullName");

    if(storedName && storedName!== "undefined" && storedName!=="null"){
      setUser({name: storedName});
      return;
    }
    const fetchUser = async () =>{
      try{
        const id = localStorage.getItem("userId");

        if(!id) return;

        const userData = await getUserById(id);
        console.log(userData);

        localStorage.setItem("fullName", userData.user_name);

        setUser({
          name:userData.user_name
        });
      } catch(error){
        console.log("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {

    const updateProfileName = () => {

        const updatedName =
            localStorage.getItem("fullName");

        if (updatedName) {
            setUser({ name: updatedName });
        }
    };

    window.addEventListener(
        "profileUpdated",
        updateProfileName
    );

    return () => {
        window.removeEventListener(
            "profileUpdated",
            updateProfileName
        );
    };

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
    <div className="mainheader">

      <div className="profile-section" ref={dropdownRef}>
        <div
          className="profile"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
          </div>
          <span>{user.name}</span>
        </div>

        {open && (
          <div className="dropdown">
            <p onClick={() =>{
              setOpen(false);
              const role = localStorage.getItem("role");

              navigate(`/${role.toLowerCase()}/profile`);
            }}>My Profile</p>
            
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;