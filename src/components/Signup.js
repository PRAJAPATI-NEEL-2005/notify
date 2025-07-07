import React, { useState } from 'react';
import AuthContext from '../context/authentication/authContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function Signup(props) {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
const {signup} = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
const goToLogin = () => {
  navigate("/login"); // or use props if passed from parent
};
  const handleSubmit =async (e) => {
    e.preventDefault();
    // You can send this data to your backend API here

    const result = await signup(credentials.name,credentials.email, credentials.password);
    if (result.success) {
      props.showalert("signup successful!","success");
      navigate('/home');
    } else {
            props.showalert(result.message,"danger");

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
    <h3 className="text-center mb-4 text-primary fw-bold">Create Account ✨</h3>
    <form onSubmit={handleSubmit}>
      {/* Full Name */}
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

      {/* Email */}
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

      {/* Password */}
      <div className="form-floating mb-3">
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

      <button type="submit" className="btn btn-primary w-100 mb-3 shadow-sm">
        Sign Up
      </button>
      <button
        type="button"
        className="btn btn-outline-primary w-100 shadow-sm"
        onClick={goToLogin}
      >
        Already have an account? Login
      </button>
    </form>
  </div>
</div>

  );
}

export default Signup;
