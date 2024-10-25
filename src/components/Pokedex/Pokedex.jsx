import React from "react";
import './Pokedex.css'; // Importa il file CSS separato

const Pokedex = () => {
  return (
    <div className="pokedex">
      <div className="top-section">
        <div className="top-circle"></div>
        <div className="pokeball"></div>
      </div>
      <div className="screen"></div>
      <div className="control-panel">
        <div className="dpad">
          <div className="dpad-center">
            <div className="arrow up"></div>
            <div className="arrow down"></div>
            <div className="arrow left"></div>
            <div className="arrow right"></div>
          </div>
        </div>
        <div className="large-screen">
          <p className="screen-text">Your text here...</p>
        </div>
        <div className="button-controls">
          <div className="red-button">X</div>
          <div className="green-button">✔</div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;

