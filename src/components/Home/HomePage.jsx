import React, { useState } from "react";
import "./HomePage.css"; // Importiamo il file CSS per lo stile
import videoBg from "../../assets/pokedex-pokemon-moewalls-com.mp4"; // Importa il video dal percorso

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  const handleOverlayClick = () => {
    setShowContent(!showContent); // Mostra o nascondi il contenuto
  };

  return (
    <div className="homepage">
      {/* Video di sfondo */}
      <video autoPlay muted loop id="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay per catturare il click */}
      <div className="overlay" onClick={handleOverlayClick}></div>

      {/* Usa la classe show per attivare il fade-in */}
      <div className={`content ${showContent ? 'show' : ''}`} onClick={handleOverlayClick}>
        <h1>Welcome to PokéDecks!</h1>
        <p>Your personal collection of Pokémon cards awaits you.</p>
        <p>Create, search, and manage your own Pokémon card album with ease.</p>
      </div>
    </div>
  );
};

export default HomePage;
