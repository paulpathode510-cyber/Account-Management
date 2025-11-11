import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Load user data on mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setForm(loggedInUser);
    }
  }, [navigate]);

  // Handle input field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update account details
  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password } = form;
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      // Remove current user from list
      const otherUsers = users.filter((u) => u.email !== loggedInUser.email);

      // Check duplicate email among other users
      if (otherUsers.some((u) => u.email === email)) {
        setError("Email already used by another account");
        return;
      }

      // Update user data
      const updatedUser = { name, email, password };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      localStorage.setItem("users", JSON.stringify([...otherUsers, updatedUser]));
      setSuccess("Account updated successfully!");
    } catch (err) {
      console.error(err);
      setError("An error occurred while updating account.");
    }
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login", { replace: true });
  };

  // Delete account
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!loggedInUser) {
        setError("No logged-in user found.");
        return;
      }

      // Remove deleted user
      const updatedUsers = users.filter((u) => u.email !== loggedInUser.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("loggedInUser");

      alert("Account deleted successfully.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Account Info</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Update Account
          </button>

          <button type="button" className="btn btn-danger w-100 mb-2" onClick={handleDelete}>
            Delete Account
          </button>

          <button type="button" className="btn btn-secondary w-100" onClick={handleLogout}>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
