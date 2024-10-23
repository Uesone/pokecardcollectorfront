import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link di react-router-dom
import LoginModal from "../../Modals/ModaleLogIn/LoginModal"; // Importiamo il LoginModal
import SignupModal from "../../Modals/ModaleSignUp/SignupModal"; // Importiamo anche il SignupModal

const SidebarMenu = ({
  showSidebar,
  toggleSidebar,
  isLoggedIn,
  setIsLoggedIn,
  setRole,
  handleLogout,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false); // Stato per il modale di login
  const [showSignupModal, setShowSignupModal] = useState(false); // Stato per il modale di signup

  // Funzioni per gestire l'apertura e la chiusura dei modali
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleShowSignupModal = () => setShowSignupModal(true);
  const handleCloseSignupModal = () => setShowSignupModal(false);

  return (
    <>
      <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end" className="custom-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {!isLoggedIn ? (
              <>
                {/* Questi link saranno visibili solo in modalità mobile */}
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
                <Link to="#profile" className="nav-link" onClick={toggleSidebar}>
                  Profile
                </Link>
                <Link to="#collections" className="nav-link" onClick={toggleSidebar}>
                  My Collections
                </Link>
                <Nav.Link href="#logout" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modale di Login visibile in mobile */}
      <LoginModal
        show={showLoginModal}
        handleClose={handleCloseLoginModal}
        setIsLoggedIn={setIsLoggedIn}
        setRole={setRole}
      />

      {/* Modale di Sign Up visibile in mobile */}
      <SignupModal
        show={showSignupModal}
        handleClose={handleCloseSignupModal}
      />
    </>
  );
};

export default SidebarMenu;
