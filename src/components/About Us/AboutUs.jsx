import React, { useState, useEffect } from 'react';
import 'nes.css/css/nes.min.css'; // Importa lo stile NES per le icone
import './AboutUs.css';
import videoBg from '../../assets/hilda-and-tepig-watching-castelia-city-pokemon-pixel-moewalls-com.mp4';

const AboutUs = () => {
  const [showContent, setShowContent] = useState(false); // Stato per il ritardo di visualizzazione del contenuto

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000); // Ritardo di 2 secondi

    return () => clearTimeout(timer); // Pulizia del timer quando il componente viene smontato
  }, []);

  const handleCloseContent = () => {
    setShowContent(false); // Nasconde il contenuto quando si clicca sul pulsante di chiusura
  };

  return (
    <div className="about-us-page">
      <video autoPlay loop muted className="background-video">
        <source src={videoBg} type="video/mp4" />
      </video>

      {showContent && (
        <div className="content fade-in">
          <button className="close-button" onClick={handleCloseContent}>
            ✕
          </button>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="nes-icon is-medium facebook"></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="nes-icon is-medium twitter"></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nes-icon is-medium instagram"></a>
          </div>
          <h1 className="about-us-title">About Us</h1>
          <p className="about-us-text">
            We’re huge fans of the 8-bit era, where everything was simpler, and every pixel counted. Inspired by the
            games that shaped our childhood, we bring you a blend of retro vibes and modern magic.
          </p>
          <p className="about-us-text">
            Pokémon has always been at the heart of our adventure. From collecting cards to exploring the games, our
            love for Pokémon goes beyond nostalgia. It’s about the thrill of discovery, the excitement of collecting,
            and the joy of connecting with others who share the same passion.
          </p>
          <p className="about-us-text">
            Whether you’re here to relive the good old days or to catch 'em all in a whole new way, we’re thrilled to
            have you join us. So grab your Pokédex, sharpen your skills, and let’s embark on this journey together!
          </p>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
