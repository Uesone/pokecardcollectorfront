import React, { useState } from "react";
import SignupModal from "../../components/Modals/ModaleSignUp/SignupModal";
import MessageModal from "../../components/Modals/ErrorModals/MessageModal"; // Importa il componente per i messaggi

const API_BASE_URL = "http://localhost:3001";

const AuthComponent = ({ setIsLoggedIn, setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [messageModal, setMessageModal] = useState({
    show: false,
    message: "",
    isError: false,
  });

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
        localStorage.setItem("jwtToken", token); // Memorizza il token nel localStorage
        setRole(role);
        setIsLoggedIn(true);
      } else {
        setMessageModal({
          show: true,
          message: "Login failed. Please check your credentials.",
          isError: true,
        });
      }
    } catch (error) {
      setMessageModal({
        show: true,
        message: "An error occurred during login.",
        isError: true,
      });
    }
  };

  const handleShowSignupModal = () => setShowSignupModal(true);
  const handleCloseSignupModal = () => setShowSignupModal(false);
  const handleCloseMessageModal = () =>
    setMessageModal({ show: false, message: "", isError: false });

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
        <button className="signup-button" onClick={handleShowSignupModal}>
          SIGN UP
        </button>
      </div>

      {/* Modale di Sign Up */}
      <SignupModal
        show={showSignupModal}
        handleClose={handleCloseSignupModal}
      />

      {/* Modale di messaggio */}
      <MessageModal
        show={messageModal.show}
        handleClose={handleCloseMessageModal}
        message={messageModal.message}
        isError={messageModal.isError}
      />
    </div>
  );
};

export default AuthComponent;
