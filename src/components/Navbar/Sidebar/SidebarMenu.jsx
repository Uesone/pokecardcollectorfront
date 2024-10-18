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
            // Sidebar dopo il login con Trading Cards e altri link
            <>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#pokedex">Pokédex</Nav.Link>
              <Nav.Link href="#trading">Trading Cards</Nav.Link> {/* Nuovo link Trading Cards */}
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#collections">My Collections</Nav.Link>
              <Nav.Link href="#logout" onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SidebarMenu;
