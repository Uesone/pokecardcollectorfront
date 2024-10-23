import React, { useState } from "react";
import MessageModal from "../../components/Modals/ErrorModals/MessageModal";

const API_BASE_URL = "http://localhost:3001";

const AuthComponent = ({ setIsLoggedIn, setRole, setUserId }) => {
  // Aggiungi setUserId
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageModal, setMessageModal] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role, userId } = data;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId", userId); // Salva l'ID dell'utente nel localStorage
        setRole(role);
        setUserId(userId); // Imposta l'ID utente nello stato
        setIsLoggedIn(true);
        window.location.reload();
        navigate("/");
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

  return (
    <div className="nav-center">
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        LOG IN
      </button>

      <MessageModal
        show={messageModal.show}
        message={messageModal.message}
        isError={messageModal.isError}
        handleClose={() =>
          setMessageModal({ show: false, message: "", isError: false })
        }
      />
    </div>
  );
};

export default AuthComponent;
