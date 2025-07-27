import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyOTP({ showalert }) {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
const host = process.env.REACT_APP_BACKEND_SERVER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });

    const data = await response.json();
    if (data.success) {
      showalert('OTP verified successfully', 'success');
      navigate('/reset-password', { state: { email, otp } });
    } else {
      showalert(data.error || 'Invalid OTP', 'danger');
    }
  };

  if (!email) {
    navigate('/forgot-password');
    return null;
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <div className="card shadow border-0" style={{ width: "100%", maxWidth: "450px", padding: "2.5rem", borderRadius: "var(--border-radius)" }}>
        <h3 className="text-center mb-4">Verify OTP</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="floatingOtp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <label htmlFor="floatingOtp">Enter OTP</label>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
