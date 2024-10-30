import React, { useState, useRef, useEffect } from "react";
import "./HomePage.css";
import videoBg from "../../assets/may-riding-bicycle-pokemon-emerald-pixel-moewalls-com.mp4";
import logoImage from "../../assets/Remove-bg.ai_1730158329638.png";
import pokemonTheme from '../../assets/pokemon-theme.mp3';
import audioOnIcon from '../../assets/audio-on.png';
import audioOffIcon from '../../assets/audio-off.png'; 

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);
  const [moveToNavbar, setMoveToNavbar] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Funzione per avviare l'audio dopo l'interazione dell'utente
  const startAudioAfterInteraction = () => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.play();
        setIsAudioPlaying(true);
      }
    }, 4000);
    document.removeEventListener("click", startAudioAfterInteraction);
  };

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      setTimeout(() => setMoveToNavbar(true), 2000);
    }, 4000);

    document.addEventListener("click", startAudioAfterInteraction);

    return () => {
      clearTimeout(contentTimer);
      document.removeEventListener("click", startAudioAfterInteraction);
    };
  }, []);

  // Funzione per attivare/disattivare la musica
  const toggleAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  return (
    <div className="homepage">
      {/* Audio per la musica di sfondo */}
      <audio ref={audioRef} src={pokemonTheme} loop />

      {/* Video di sfondo */}
      <video autoPlay muted loop id="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Div contenitore del logo */}
      <div className={`logo-container ${showContent ? "show" : ""} ${moveToNavbar ? "move-to-navbar" : ""}`}>
        <img src={logoImage} alt="PokéDecks Logo" className="logo-image" />
      </div>

      {/* Icona per attivare/disattivare la musica */}
      <img
        src={isAudioPlaying ? audioOnIcon : audioOffIcon}
        onClick={toggleAudio}
        className="audio-icon"
        alt={isAudioPlaying ? "Audio On" : "Audio Off"}
      />
    </div>
  );
};

export default HomePage;
