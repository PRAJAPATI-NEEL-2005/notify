import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword({ showalert }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
const host = process.env.REACT_APP_BACKEND_SERVER;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/request-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    if (data.success) {
      showalert('OTP sent to your email.', 'success');
      navigate('/verify-otp', { state: { email } });
    } else {
      showalert(data.error || 'Something went wrong.', 'danger');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <div className="card shadow border-0" style={{ width: "100%", maxWidth: "450px", padding: "2.5rem", borderRadius: "var(--border-radius)" }}>
        <h3 className="text-center mb-4">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">Send OTP</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
