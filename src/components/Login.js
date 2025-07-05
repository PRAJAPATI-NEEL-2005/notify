import React, { useState, useContext } from 'react';
import AuthContext from '../context/authentication/authContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials.email, credentials.password);
    if (result.success) {
      alert("Login successful!");
      // Optionally navigate to dashboard
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-top my-5 bg-light">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
