import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'nes.css/css/nes.min.css';
import MessageModal from '../../Modals/ErrorModals/MessageModal';

const LoginModal = ({ show, handleClose, setIsLoggedIn, setRole }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [messageModal, setMessageModal] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessageModal({
        show: true,
        message: "Please fill in both username and password.",
        isError: true,
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role } = data;

        if (!token) {
          setMessageModal({
            show: true,
            message: "Token is missing from response.",
            isError: true,
          });
          return;
        }

        localStorage.setItem("jwtToken", token);
        setRole(role);
        setIsLoggedIn(true);

        setTimeout(() => {
          handleClose(); // Chiudi il modale dopo il login
        }, 100);
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

  const handleCloseMessageModal = () =>
    setMessageModal({ show: false, message: "", isError: false });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <div className="nes-field">
              <label htmlFor="formUsername">Username</label>
              <input
                type="text"
                id="formUsername"
                className="nes-input"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="nes-field">
              <label htmlFor="formPassword">Password</label>
              <input
                type="password"
                id="formPassword"
                className="nes-input"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Aggiunta del font 'Press Start 2P' con la classe nes-btn */}
            <button type="submit" className="nes-btn is-primary">
              Login
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <MessageModal
        show={messageModal.show}
        handleClose={handleCloseMessageModal}
        message={messageModal.message}
        isError={messageModal.isError}
      />
    </>
  );
};

export default LoginModal;
