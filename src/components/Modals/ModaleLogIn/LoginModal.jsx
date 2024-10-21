import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MessageModal from "../../Modals/ErrorModals/MessageModal";

const API_BASE_URL = "http://localhost:3001";

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
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
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

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
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
