import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

const Login = ({ onLoginSuccess }) => {
  const [role, setRole] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const login = async () => {
    setMessage({ type: "", text: "" });

    if (!username || !password) {
      setMessage({ type: "error", text: "Username and Password are required!" });
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || "https://ai-powered-emergency-health-network-server.vercel.app";

      const response = await fetch(`${apiUrl}/login/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        setMessage({ type: "success", text: data.message });

        if (onLoginSuccess) {
          onLoginSuccess(username, role);
        }

        setTimeout(() => navigate("/"), 1000); // Redirect after success message
      } else {
        setMessage({ type: "error", text: data.message || "Login failed. Try again." });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage({
        type: "error",
        text: error.message.includes("Failed to fetch")
          ? "Network error: Unable to reach the server."
          : "An unexpected error occurred. Please try again later.",
      });
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

        {message.text && <div className={message.type === "error" ? "error" : "success"}>{message.text}</div>}
      </div>
    </div>
  );
};

export default Login;
