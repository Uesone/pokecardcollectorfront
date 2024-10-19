import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Usa Link per la navigazione
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import AuthComponent from '../../js/Auth/AuthComponent';
import SidebarMenu from '../../components/Navbar/Sidebar/SidebarMenu';
import AuthManager from '../../js/Auth/AuthManager';
import logo from '../../assets/pokemon-pokeball-legue-seeklogo.png';

// Importa le icone SVG
import homeIcon from '../../assets/icons/home-icon.svg';
import pokedexIcon from '../../assets/icons/pokedex-icon.svg';
import tradingCardsIcon from '../../assets/icons/trading-cards-icon.svg';
import aboutUsIcon from '../../assets/icons/about-us-icon.svg';

const CustomNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stato per il login
  const [role, setRole] = useState(''); // Ruolo dell'utente (USER o ADMIN)

  // Gestione del logout
  const { handleLogout } = AuthManager({ setIsLoggedIn, setRole });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className={`navbar-container ${isLoggedIn ? 'navbar-logged-in' : ''}`}>
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
          {/* Cambia il font di PokèAlbum in Press Start 2P se l'utente è loggato */}
          <span className={isLoggedIn ? 'press-start-font' : ''}>PokèAlbum</span>
        </div>

        {/* Prima del login */}
        {!isLoggedIn ? (
          <AuthComponent setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
        ) : (
          // Navbar con i pulsanti divisi in div con icone sopra i testi dopo il login
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
        )}

        <div className="navbar-toggle">
          <Button variant="outline-light" onClick={toggleSidebar} className="sidebar-toggle">
            ☰
          </Button>
        </div>
      </div>

      {/* Sidebar con Home, Pokédex, Trading Cards, Profile, My Collections */}
      <SidebarMenu
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        role={role}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default CustomNavbar;
