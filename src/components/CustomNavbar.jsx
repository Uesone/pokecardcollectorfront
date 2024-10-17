import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Offcanvas, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">cardmarket</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} className="sidebar-toggle d-lg-none">
            ☰
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Form className="d-none d-lg-flex login-form">
              <FormControl type="text" placeholder="Username" className="mr-sm-2" />
              <a href="#forgot" className="forgot-link">FORGOT?</a>
              <FormControl type="password" placeholder="Password" className="mr-sm-2" />
              <a href="#forgot" className="forgot-link">FORGOT?</a>
              <Button variant="outline-info">LOG IN</Button>
              <Button variant="outline-light" className="ml-2">SIGN UP</Button>
            </Form>
            <Button variant="outline-light d-none d-lg-flex" onClick={toggleSidebar} className="sidebar-toggle d-none d-lg-inline-block">
              ☰
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar for Mobile and Tablet */}
      <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end" className="custom-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#policies">Policies</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#help">Help</Nav.Link>
            <Nav.Link href="#jobs">Jobs</Nav.Link>
            <div className="dark-mode-toggle">
              <span>Dark Mode</span>
              <input type="checkbox" checked readOnly />
            </div>
            <Nav.Link href="#language">English ▼</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;