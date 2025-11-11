import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  // Navigation hook for redirecting between routes
  const navigate = useNavigate();

  // State for storing email and password input fields
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // State for storing and displaying validation or login errors
  const [error, setError] = useState("");

  // Updates form state whenever the user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Main function to handle login logic
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = form;

    // Validation: Both fields must be filled
    if (!email || !password) {
      setError("All Fields are Required");
      return;
    }

    try {
      // Retrieve all users from localStorage or empty array
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find user with matching email and password
      const user = users.find((u) => u.email === email && u.password === password);

      // If no match found, show error
      if (!user) {
        setError("Invalid Email or password");
        return;
      }

      // Save logged-in user to localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Redirect to dashboard after successful login
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Error Occured while Login");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Login</h3>

        {/* Show error message if login fails */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Redirect link for new users */}
        <p className="text-center mt-2">
          New user? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
