import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css"; // Import login CSS

const Login = ({ onLoginSuccess }) => {
  const [role, setRole] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!username || !password) {
      setErrorMessage("Username and Password are required!");
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || "https://ai-powered-emergency-health-network-server.vercel.app";

      const response = await fetch(`${apiUrl}/login/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for CORS with credentials
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        throw new Error("Failed to login. Please try again.");
      }

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        if (onLoginSuccess) {
          onLoginSuccess(username, role);
        }

        navigate("/");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login / Sign up</h2>
        <div className="input-group">
          <label htmlFor="role">Select Role:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="hospital">Hospital</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        </div>

        <button onClick={login}>Login / Sign up</button>

        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
