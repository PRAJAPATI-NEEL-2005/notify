import React, { useState } from "react";
import AuthContext from "./authContext";

const Authstate = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
const host = process.env.REACT_APP_BACKEND_SERVER;
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

const getUser = async () => {
  try {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // ✅ Save to localStorage
      return { success: true, user: data };
    } else {
      setUser(null);
      localStorage.removeItem("user");
      return { success: false, message: data.error || "Failed to fetch user" };
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    setUser(null);
    localStorage.removeItem("user");
    return { success: false, message: "Something went wrong" };
  }
};



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
        await getUser();
        return { success: true, message: json.message };
      } else {
        return { success: false, message: json.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong" };
    }
  };


  const signup = async (name ,email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email, password }),
      });

      const json = await response.json();

      if (response.status === 200 && json.success) {
        localStorage.setItem("token", json.jwtdata);
        setToken(json.jwtdata);
        setIsAuthenticated(true);
        await getUser();
        return { success: true, message: json.message };
      } else {
        return { success: false, message: json.message || "signup failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong" };
    }
  };
  return (
    <AuthContext.Provider value={{ token, isAuthenticated,setIsAuthenticated ,login ,signup,setUser,user,getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default Authstate;
