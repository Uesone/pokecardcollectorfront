// CustomNavbar.js

import React, { useState } from 'react';
import { Offcanvas, Nav, Button } from 'react-bootstrap';
import { FaUser, FaKey } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import logo from '../assets/img/pokeball.png';

const CustomNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src={logo} alt="logo" /> 
          <span>PokèAlbum</span>
        </div>

        {/* Login Form and Buttons Section */}
        <div className="nav-center">
          <div className="input-group">
            <div className="input-icon"><FaUser /></div>
            <input type="text" placeholder="Username" className="input-field" />
            <a href="/forgot-password" className="forgot-link">FORGOT?</a>
          </div>
          
          <div className="input-group">
            <div className="input-icon"><FaKey /></div>
            <input type="password" placeholder="Password" className="input-field" />
            <a href="/forgot-password" className="forgot-link">FORGOT?</a>
          </div>
          
          <div className="button-container">
            <Button variant="outline-info" className="login-button">LOG IN</Button>
          </div>
          
          <div className="button-container">
            <Button variant="outline-light" className="signup-button">SIGN UP</Button>
          </div>
        </div>

        {/* Hamburger Menu Section */}
        <div className="navbar-toggle">
          <Button variant="outline-light" onClick={toggleSidebar} className="sidebar-toggle">
            ☰
          </Button>
        </div>
      </div>

      {/* Sidebar for Mobile */}
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
