import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  // Local state to store logged-in user data
  const [user, setUser] = useState(null);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Check if user is logged in when dashboard mounts
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // If no logged-in user found, redirect to login page
    if (!loggedInUser) {
      navigate("/login");
    } else {
      // If found, store user data in component state
      setUser(loggedInUser);
    }
  }, [navigate]);

  // Logout logic: remove user from localStorage and redirect
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  // Navigate to account management page
  const handleAccount = () => {
    navigate("/account");
  };

  // Avoid rendering until user data is available
  if (!user) return null;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg text-center"
        style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}
      >
        {/* Welcome header */}
        <h3 className="mb-4 text-primary fw-bold">Welcome to Your Dashboard</h3>

        {/* Display user information */}
        <p className="text-muted">
          Hello <strong>{user.name}</strong> 👋 <br />
          You are successfully logged in with the email <strong>{user.email}</strong>.
        </p>

        <hr />

        {/* Action buttons section */}
        <div className="mt-4">
          <p className="text-secondary mb-3">
            You can manage your account information or log out using the buttons below.
          </p>

          {/* Button group for navigation actions */}
          <div className="d-grid gap-3">
            <button className="btn btn-outline-primary" onClick={handleAccount}>
              Manage My Account
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
