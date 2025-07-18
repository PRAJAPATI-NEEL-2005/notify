import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication/authContext";

function Navbar(props) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handlelogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("chatbotMessages");
    setIsAuthenticated(false);     
    props.showalert("Logged out successfully", "success");
    navigate("/login");  
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: "white" }}>
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
              <NavLink
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/home"
              >
                <i className="fa-solid fa-house me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/about"
              >
                <i className="fa-solid fa-circle-info me-1"></i> About
              </NavLink>
            </li>
             <li className="nav-item">
              <NavLink
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/AIChatbot"
              >
                <i className="fa-solid fa-circle-info me-1"></i> chatbot
              </NavLink>
            </li>
          </ul>
          
          <div className="d-flex">
            {isAuthenticated ? (
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={handlelogout}
              >
                <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-outline-primary me-2" role="button" to="/login">
                  <i className="fa-solid fa-right-to-bracket me-1"></i> Login
                </Link>
                <Link className="btn btn-primary" role="button" to="/signup">
                  <i className="fa-solid fa-user-plus me-1"></i> Signup
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
