import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#f4f4f4" }}>
      <Link to="/">Home</Link> |{" "}
      {user ? (
        <>
          <Link to="/complaint">New Complaint</Link> |{" "}
          {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>} |{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
