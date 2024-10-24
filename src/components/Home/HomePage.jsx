import React, { useState, useEffect } from "react";
import "./HomePage.css"; // Importiamo il file CSS per lo stile
import videoBg from "../../assets/pokedex-pokemon-moewalls-com.mp4"; // Importa il video dal percorso

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  // Mostra il contenuto automaticamente dopo 4 secondi
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000); // 4 secondi

    // Pulizia del timer quando il componente viene smontato
    return () => clearTimeout(timer);
  }, []);

  // Funzione per chiudere il contenuto
  const handleCloseContent = () => {
    setShowContent(false);
  };

  return (
    <div className="homepage">
      {/* Video di sfondo */}
      <video autoPlay muted loop id="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Usa la classe 'show' per il fade-in del contenuto */}
      <div className={`content ${showContent ? 'show' : ''}`}>
        <button className="close-button" onClick={handleCloseContent}>
          &times;
        </button>
        <h1>Welcome to PokéDecks!</h1>
        <p>Your personal collection of Pokémon cards awaits you.</p>
        <p>Create, search, and manage your own Pokémon card album with ease.</p>
      </div>
    </div>
  );
};

export default HomePage;
