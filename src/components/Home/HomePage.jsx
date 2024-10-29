import React, { useState, useEffect } from "react";
import "./HomePage.css";
import videoBg from "../../assets/may-riding-bicycle-pokemon-emerald-pixel-moewalls-com.mp4";
import logoImage from "../../assets/Remove-bg.ai_1730158329638.png"; // Importa il logo

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);
  const [moveToNavbar, setMoveToNavbar] = useState(false);

  // Mostra il contenuto automaticamente dopo 4 secondi
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      // Attiva il movimento verso la navbar dopo l'animazione iniziale
      setTimeout(() => setMoveToNavbar(true), 2000); // 2 secondi di ritardo per permettere il fade-in
    }, 4000);

    // Pulizia del timer quando il componente viene smontato
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="homepage">
      {/* Video di sfondo */}
      <video autoPlay muted loop id="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Div contenitore del logo */}
      <div className={`logo-container ${showContent ? "show" : ""} ${moveToNavbar ? "move-to-navbar" : ""}`}>
        <img src={logoImage} alt="PokéDecks Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default HomePage;
