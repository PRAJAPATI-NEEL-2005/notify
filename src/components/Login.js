import React, { useState, useContext } from 'react';
import AuthContext from '../context/authentication/authContext';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const goToSignup = () => {
    navigate("/signup");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials.email, credentials.password);
    if (result.success) {
      props.showalert("Login successful!", "success");
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
          <i className="fas fa-note-sticky fa-3x mb-3" style={{ color: "var(--primary)" }}></i>
          <h3 className="fw-bold">Welcome Back</h3>
          <p className="text-muted">Sign in to access your notes</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingEmail"
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
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
            <i className="fas fa-sign-in-alt me-2"></i> Login
          </button>
          
          <button
            type="button"
            className="btn btn-outline-primary w-100 py-2"
            onClick={goToSignup}
          >
            <i className="fas fa-user-plus me-2"></i> Create New Account
          </button>
        </form>
        
        <div className="text-center mt-4">
          <small className="text-muted">
            Forgot your password? <a href="#!" className="text-decoration-none">Reset it here</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
