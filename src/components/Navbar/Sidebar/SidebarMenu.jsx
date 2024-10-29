import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "../../Modals/ModaleLogIn/LoginModal";
import SignupModal from "../../Modals/ModaleSignUp/SignupModal";
import './SidebarMenu.css';

const SidebarMenu = ({
  showSidebar,
  toggleSidebar,
  isLoggedIn,
  setIsLoggedIn,
  setRole,
  handleLogout,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleShowSignupModal = () => setShowSignupModal(true);
  const handleCloseSignupModal = () => setShowSignupModal(false);

  return (
    <>
      <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end" className="custom-offcanvas">
        <Offcanvas.Header>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {!isLoggedIn ? (
              <>
                <Nav.Link className="mobile-only" onClick={handleShowLoginModal}>
                  Login
                </Nav.Link>
                <Nav.Link className="mobile-only" onClick={handleShowSignupModal}>
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link" onClick={toggleSidebar}>
                  Home
                </Link>
                <Link to="/pokedex" className="nav-link" onClick={toggleSidebar}>
                  Pokédex
                </Link>
                <Link to="/trading-cards" className="nav-link" onClick={toggleSidebar}>
                  Trading Cards
                </Link>
                <Nav.Link href="#logout" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <LoginModal
        show={showLoginModal}
        handleClose={handleCloseLoginModal}
        setIsLoggedIn={setIsLoggedIn}
        setRole={setRole}
      />

      <SignupModal
        show={showSignupModal}
        handleClose={handleCloseSignupModal}
      />
    </>
  );
};

export default SidebarMenu;
