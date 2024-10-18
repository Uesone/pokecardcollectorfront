// SidebarMenu.js
import React from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';

const SidebarMenu = ({ showSidebar, toggleSidebar, isLoggedIn, role, handleLogout }) => {
  return (
    <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end" className="custom-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          {!isLoggedIn ? (
            <>
              <Nav.Link href="#policies">Policies</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
              <Nav.Link href="#help">Help</Nav.Link>
              <Nav.Link href="#jobs">Jobs</Nav.Link>
            </>
          ) : (
            <>
              {role === 'ADMIN' && <Nav.Link href="#admin">Admin Panel</Nav.Link>}
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#settings">Settings</Nav.Link>
              <Nav.Link href="#logout" onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SidebarMenu;
