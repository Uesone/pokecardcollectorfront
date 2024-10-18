// AuthComponent.js
import React, { useState } from "react";

const API_BASE_URL = "http://localhost:3001"; // URL del tuo backend

const AuthComponent = ({ setIsLoggedIn, setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Funzione di login
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role } = data;
        // Memorizza il token nel localStorage
        localStorage.setItem("jwtToken", token);
        setRole(role);
        setIsLoggedIn(true);
      } else {
        console.error("Errore durante il login");
      }
    } catch (error) {
      console.error("Errore durante il login", error);
    }
  };

  return (
    <div className="nav-center">
      <div className="input-group">
        <div className="input-icon">👤</div>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <a href="/forgot-password" className="forgot-link">
          FORGOT?
        </a>
      </div>

      <div className="input-group">
        <div className="input-icon">🔒</div>
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/forgot-password" className="forgot-link">
          FORGOT?
        </a>
      </div>

      <div className="button-container">
        <button className="login-button" onClick={handleLogin}>
          LOG IN
        </button>
      </div>

      <div className="button-container">
        <button className="signup-button">SIGN UP</button>
      </div>
    </div>
  );
};

export default AuthComponent;
