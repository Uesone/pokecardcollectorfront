import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Navbar/Navbar.css';
import SidebarMenu from '../../components/Navbar/Sidebar/SidebarMenu';
import AuthManager from '../../js/Auth/AuthManager';
import logo from '../../assets/pokemon-pokeball-legue-seeklogo.png';

import LoginModal from '../../components/Modals/ModaleLogIn/LoginModal';
import SignupModal from '../../components/Modals/ModaleSignUp/SignupModal';

// Importa le icone SVG
import homeIcon from '../../assets/icons/home-icon.svg';
import pokedexIcon from '../../assets/icons/pokedex-icon.svg';
import tradingCardsIcon from '../../assets/icons/trading-cards-icon.svg';
import aboutUsIcon from '../../assets/icons/about-us-icon.svg';

const CustomNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const { handleLogout } = AuthManager({ setIsLoggedIn, setRole });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className={`navbar-container ${isLoggedIn ? 'navbar-logged-in' : ''}`}>
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
          <span className={isLoggedIn ? 'press-start-font' : ''}>PokèAlbum</span>
        </div>

        {/* Prima del login */}
        {!isLoggedIn ? (
          <div className="nav-right">
            <div className="auth-buttons">
              <button className="login-button" onClick={() => setShowLoginModal(true)}>LOG IN</button>
              <button className="signup-button" onClick={() => setShowSignupModal(true)}>SIGN UP</button>
            </div>
            <Button variant="outline-light" onClick={toggleSidebar} className="sidebar-toggle">
              ☰
            </Button>
          </div>
        ) : (
          // Dopo il login: Mostra i pulsanti di navigazione centrati
          <div className="nav-center">
            <Nav className="nav-center">
              <div className="nav-item">
                <Link to="/" className="nav-button">
                  <img src={homeIcon} alt="Home" className="navbar-icon" />
                  <span>Home</span>
                </Link>
              </div>

              <div className="nav-item">
                <Link to="/pokedex" className="nav-button">
                  <img src={pokedexIcon} alt="Pokedex" className="navbar-icon" />
                  <span>Pokédex</span>
                </Link>
              </div>

              <div className="nav-item">
                <Link to="/trading-cards" className="nav-button">
                  <img src={tradingCardsIcon} alt="Trading Cards" className="navbar-icon" />
                  <span>Trading Cards</span>
                </Link>
              </div>

              <div className="nav-item">
                <Link to="/about-us" className="nav-button">
                  <img src={aboutUsIcon} alt="About Us" className="navbar-icon" />
                  <span>About Us</span>
                </Link>
              </div>
            </Nav>
            <Button variant="outline-light" onClick={toggleSidebar} className="sidebar-toggle">
              ☰
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <SidebarMenu
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        role={role}
        handleLogout={handleLogout}
      />

      {/* Modale di Login */}
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        setIsLoggedIn={setIsLoggedIn}
        setRole={setRole}
      />

      {/* Modale di Signup */}
      <SignupModal
        show={showSignupModal}
        handleClose={() => setShowSignupModal(false)}
      />
    </>
  );
};

export default CustomNavbar;
