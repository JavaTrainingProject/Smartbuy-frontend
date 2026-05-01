import { useEffect, useRef, useState } from "react";
import "../styles/Header.css";

 function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = {
    name: "Ajay",
  };

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("token");
    setOpen(false);
  
  };

  
  useEffect(() => {
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
            {user.name.charAt(0).toUpperCase()}
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