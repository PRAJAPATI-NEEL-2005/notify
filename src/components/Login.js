import React, { useState, useContext } from 'react';
import AuthContext from '../context/authentication/authContext';
import { useNavigate } from 'react-router-dom';
function Login() {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
   
const navigate=useNavigate();
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
      alert("Login successful!");
      navigate('/home');
    } else {
      alert(result.message);
    }
  };

  return (
     <div className="d-flex justify-content-center align-items-center my-5">
  <div
    className="card shadow border-0"
    style={{
      width: "100%",
      maxWidth: "420px",
      padding: "2rem",
      borderRadius: "1rem",
      background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
    }}
  >
    <h3 className="text-center mb-4 text-primary fw-bold">Welcome Back 👋</h3>
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

      <div className="form-floating mb-3">
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

      <button type="submit" className="btn btn-primary w-100 mb-3 shadow-sm">
        Login
      </button>
      <button
        type="button"
        className="btn btn-outline-primary w-100 shadow-sm"
        onClick={goToSignup}
      >
        Create New Account
      </button>
    </form>
    <div className="text-center mt-3">
      <small className="text-muted">
        Forgot your password? <a href="#!" className="text-decoration-none">Click here</a>
      </small>
    </div>
  </div>
</div>

 

  
  );
}

export default Login;
