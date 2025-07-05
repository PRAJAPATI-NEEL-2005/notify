import React, { useState } from "react";
import AuthContext from "./authContext";

const Authstate = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
const host = "http://localhost:5000";
  const login = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (response.status === 200 && json.success) {
        localStorage.setItem("token", json.jwtdata);
        setToken(json.jwtdata);
        setIsAuthenticated(true);
        return { success: true, message: json.message };
      } else {
        return { success: false, message: json.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong" };
    }
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default Authstate;
