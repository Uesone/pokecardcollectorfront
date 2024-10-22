import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import Home from "./components/Home/HomePage"; // Importa la pagina Home
import TradingCards from "./components/TradingCards/TradingCards"; // Importa la pagina TradingCards
import Pokedex from "./components/Pokedex/Pokedex"; // Importa il componente Pokedex

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trading-cards" element={<TradingCards />} />{" "}
        {/* Aggiungi la rotta per TradingCards */}
        <Route path="/pokedex" element={<Pokedex />} />{" "}
        {/* Aggiungi la rotta per Pokedex */}
        {/* Aggiungi altre rotte per altre pagine */}
      </Routes>
    </Router>
  );
};

export default App;
