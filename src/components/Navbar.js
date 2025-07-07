import React, { useContext } from "react";
import { Link } from "react-router";
import { NavLink } from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

import AuthContext from "../context/authentication/authContext";
function Navbar(props) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handlelogout = () => {
      localStorage.removeItem("token"); 
  setIsAuthenticated(false);     
  props.showalert("logged out successfully","success")
  navigate("/login");  
  };

  const location = useLocation();
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Navbar
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
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : ""
                } `}
                aria-current="page"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {isAuthenticated ? (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handlelogout}
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-primary" role="button" to="/signup">
                Signup
              </Link>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
