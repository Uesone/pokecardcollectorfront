// CustomNavbar.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import AuthComponent from '../../js/Auth/AuthComponent'; // Importa il componente AuthComponent
import SidebarMenu from '../../components/Navbar/Sidebar/SidebarMenu'; // Importa il componente SidebarMenu
import AuthManager from '../../js/Auth/AuthManager'; // Importa il gestore dell'autenticazione
import logo from '../../asset/pokemon-pokeball-legue-seeklogo.png'

const CustomNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(''); // Ruolo dell'utente (USER o ADMIN)

  // Usa il gestore dell'autenticazione
  const { handleLogout } = AuthManager({ setIsLoggedIn, setRole });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
          <span>PokèAlbum</span>
        </div>

        {!isLoggedIn ? (
          <AuthComponent setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
        ) : (
          <div className="nav-center">
            <span className="welcome-text">
              Welcome, {role === 'ADMIN' ? 'Admin' : 'User'}!
            </span>
            <FaUserCircle className="user-icon" />
          </div>
        )}

        <div className="navbar-toggle">
          <Button variant="outline-light" onClick={toggleSidebar} className="sidebar-toggle">
            ☰
          </Button>
        </div>
      </div>

      {/* Usa il componente SidebarMenu */}
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
