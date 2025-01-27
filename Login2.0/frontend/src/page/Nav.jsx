import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  
  // Initialize `isLoggedIn` directly from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("usersdatatoken"));
  });

  const handleLogout = () => {
    // Clear user data and update login state
    localStorage.removeItem("usersdatatoken");
    sessionStorage.removeItem("hash");
    setIsLoggedIn(false); // Update the state
    navigate("/"); // Redirect to the home page
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <center>
            <NavLink to="/">home</NavLink>
            <NavLink to="/dash">dash</NavLink>
            <button onClick={handleLogout}>logout</button>
          </center>
        ) : (
          <>
            <NavLink to="/">home</NavLink>
            <NavLink to="/form">form</NavLink>
            <NavLink to="/login">login</NavLink>
          </>
        )}
        <ul>
          {/* Placeholder for additional navigation links */}
        </ul>
      </nav>
      {/* Outlet renders the active child route */}
      <Outlet />
    </div>
  );
}

export default Nav;
