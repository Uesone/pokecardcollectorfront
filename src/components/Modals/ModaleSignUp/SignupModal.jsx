import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Modals/ModaleSignUp/SignupModal.css';
import MessageModal from '../../Modals/ErrorModals/MessageModal'; // Importa il componente per i messaggi

const API_BASE_URL = "http://localhost:3001";

const SignupModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [messageModal, setMessageModal] = useState({ show: false, message: '', isError: false });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessageModal({ show: true, message: 'Passwords do not match.', isError: true });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (response.ok) {
        setMessageModal({ show: true, message: 'Registration successful!', isError: false });
        handleClose();
      } else {
        setMessageModal({ show: true, message: 'Registration failed. Try again.', isError: true });
      }
    } catch (error) {
      setMessageModal({ show: true, message: 'An error occurred during registration.', isError: true });
    }
  };

  const handleCloseMessageModal = () => setMessageModal({ show: false, message: '', isError: false });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modale di messaggio */}
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
