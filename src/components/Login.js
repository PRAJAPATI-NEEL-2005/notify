import React from 'react'

function Login() {
  return (
<div className="d-flex justify-content-center align-items-top my-5 bg-light">
  <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
    <h2 className="mb-4 text-center">Login</h2>
    <form>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
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
          required
          minLength={6}
        />
      </div>
      <button type="submit" onSubmit={handleSubmit} className="btn btn-primary w-100">
        Login
      </button>
    </form>
  </div>
</div>

  )
}

export default Login
