import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../components/Navbar/Navbar.css'; // Non serve più NES.css qui
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
        {/* Div per il logo */}
        <div className="navbar-logo-container">
          <div className="navbar-logo">
            <img src={logo} alt="logo" />
            <span className={isLoggedIn ? 'nes-text' : ''}>PokèDecks</span>
          </div>
        </div>

        {/* Div centrale per la navigazione che compare solo dopo il login */}
        {isLoggedIn && (
  <div className="navbar-nav-container">
    <Nav className="nav-links">
      <div className="nav-item">
        <Link to="/" className="nav-button">
          <img src={homeIcon} alt="Home" className="navbar-icon" />
          <span>Home</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/trading-cards" className="nav-button">
          <img src={tradingCardsIcon} alt="Trading Cards" className="navbar-icon" />
          <span>Trading Cards</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/pokedex" className="nav-button">
          <img src={pokedexIcon} alt="Pokedex" className="navbar-icon" />
          <span>Pokédex</span>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/about-us" className="nav-button">
          <img src={aboutUsIcon} alt="About Us" className="navbar-icon" />
          <span>About Us</span>
        </Link>
      </div>
    </Nav>
  </div>
)}

        {/* Div per i pulsanti di autenticazione o menu hamburger */}
        <div className="navbar-auth-container">
          {!isLoggedIn ? (
            <div className="auth-buttons">
              <button className="nes-btn is-primary login-button" onClick={() => setShowLoginModal(true)}>
                LOG IN
              </button>
              <button className="nes-btn is-success signup-button" onClick={() => setShowSignupModal(true)}>
                SIGN UP
              </button>
            </div>
          ) : null}

          <div className="menu-hamburger">
            <button className="custom-hamburger-btn sidebar-toggle" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
        </div>
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
