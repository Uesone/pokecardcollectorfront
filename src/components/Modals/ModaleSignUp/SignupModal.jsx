import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'nes.css/css/nes.min.css';
import '../../Modals/ModaleSignUp/SignupModal.css';
import MessageModal from '../../Modals/ErrorModals/MessageModal';

const API_BASE_URL = "http://localhost:3001";

const SignupModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [messageModal, setMessageModal] = useState({
    show: false,
    message: '',
    isError: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessageModal({
        show: true,
        message: 'Passwords do not match.',
        isError: true
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      if (response.ok) {
        setMessageModal({
          show: true,
          message: 'Registration successful!',
          isError: false
        });
        handleClose();
      } else {
        setMessageModal({
          show: true,
          message: 'Registration failed. Try again.',
          isError: true
        });
      }
    } catch (error) {
      setMessageModal({
        show: true,
        message: 'An error occurred during registration.',
        isError: true
      });
    }
  };

  const handleCloseMessageModal = () => setMessageModal({
    show: false,
    message: '',
    isError: false
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="formEmail">Email</label>
              <input
                type="email"
                id="formEmail"
                className="nes-input"
                placeholder="Enter email"
                name="email"
                value={formData.email}
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

            <div className="nes-field">
              <label htmlFor="formConfirmPassword">Confirm Password</label>
              <input
                type="password"
                id="formConfirmPassword"
                className="nes-input"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Aggiunta del font 'Press Start 2P' con la classe nes-btn */}
            <button type="submit" className="nes-btn is-primary">
              Register
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

export default SignupModal;
