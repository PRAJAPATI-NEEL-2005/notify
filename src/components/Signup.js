import React, { useState, useContext } from 'react';
import AuthContext from '../context/authentication/authContext';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const goToLogin = () => {
    navigate("/login");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(credentials.name, credentials.email, credentials.password);
    if (result.success) {
      props.showalert("Signup successful!", "success");
      navigate('/home');
    } else {
      props.showalert(result.message, "danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <div
        className="card shadow border-0"
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "2.5rem",
          borderRadius: "var(--border-radius)",
        }}
      >
        <div className="text-center mb-4">
          <i className="fas fa-user-plus fa-3x mb-3" style={{ color: "var(--primary)" }}></i>
          <h3 className="fw-bold">Create Account</h3>
          <p className="text-muted">Sign up to start creating notes</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              id="floatingName"
              className="form-control"
              placeholder="Full Name"
              value={credentials.name}
              onChange={handleChange}
              minLength={4}
              required
            />
            <label htmlFor="floatingName">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              id="floatingEmail"
              className="form-control"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              name="password"
              id="floatingPassword"
              className="form-control"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              minLength={5}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
            <i className="fas fa-user-plus me-2"></i> Sign Up
          </button>
          
          <button
            type="button"
            className="btn btn-outline-primary w-100 py-2"
            onClick={goToLogin}
          >
            <i className="fas fa-sign-in-alt me-2"></i> Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
