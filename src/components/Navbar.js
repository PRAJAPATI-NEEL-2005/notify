import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication/authContext";
import './ProfileAnimation.css'; // Make sure this path is correct

function Navbar(props) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileRef = useRef(); // Ref for the profile container to detect clicks outside

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("chatbotMessages");
    setIsAuthenticated(false);
    props.showalert("Logged out successfully", "success");
    navigate("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileCard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard events for accessibility (e.g., Escape to close)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowProfileCard(false);
      }
    };
    if (showProfileCard) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showProfileCard]);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm mb-0 pb-0" style={{ backgroundColor: "white" }}>
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <i className="fa-solid fa-note-sticky me-2" style={{ color: "var(--primary)" }}></i>
          <span>Notify</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/home">
                <i className="fa-solid fa-house me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/yournotes">
                <i className="fa-solid fa-note-sticky"></i> Notes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/AIChatbot">
                <i className="fa-solid fa-robot"></i> AI Assistant
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/about">
                <i className="fa-solid fa-circle-info me-1"></i> About
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center profile-dropdown-wrapper" ref={profileRef}> {/* Renamed for clarity, ref moved here */}
            {isAuthenticated ? (
              <>
                <img
                  src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211469.png"
                  alt="User Profile Avatar"
                  className={`profile-avatar-image rounded-circle ${showProfileCard ? 'is-hidden' : ''}`}
                  onClick={() => setShowProfileCard(!showProfileCard)}
                  onKeyDown={(e) => { // Handle keyboard interaction
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowProfileCard(!showProfileCard);
                    }
                  }}
                  role="button"
                  tabIndex="0"
                  aria-haspopup="true"
                  aria-expanded={showProfileCard}
                  aria-label="User Profile Menu"
                  // Added inline style for consistency with CSS variable
                  style={{ border: "2px solid var(--primary, #007bff)" }}
                />

                <div
                  className={`profile-card-dropdown shadow ${showProfileCard ? "is-shown" : ""}`}
                  aria-hidden={!showProfileCard}
                >
                  <div className="card-body text-center">
                    <i className="fa-solid fa-user-circle fa-2x mb-2" aria-hidden="true"></i>
                    <p className="mb-2">Welcome!</p>
                    <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket me-1" aria-hidden="true"></i> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-primary me-2" to="/login">
                  <i className="fa-solid fa-right-to-bracket me-1" aria-hidden="true"></i> Login
                </Link>
                <Link className="btn btn-primary" to="/signup">
                  <i className="fa-solid fa-user-plus me-1" aria-hidden="true"></i> Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;