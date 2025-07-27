import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPassword({ showalert }) {
  const [newPassword, setNewPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email, otp } = location.state || {};
const host = process.env.REACT_APP_BACKEND_SERVER;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });

    const data = await response.json();
    if (data.success) {
      showalert('Password reset successful!', 'success');
      navigate('/login');
    } else {
      showalert(data.error || 'Failed to reset password', 'danger');
    }
  };

  if (!email || !otp) {
    navigate('/forgot-password');
    return null;
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <div className="card shadow border-0" style={{ width: "100%", maxWidth: "450px", padding: "2.5rem", borderRadius: "var(--border-radius)" }}>
        <h3 className="text-center mb-4">Set New Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingNewPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingNewPassword">New Password</label>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
