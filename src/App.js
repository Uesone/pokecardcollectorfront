import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import Home from "./components/Home/HomePage"; // Importa la pagina Home
import TradingCards from "./components/TradingCards/TradingCards"; // Importa la pagina TradingCards
import Pokedex from "./components/Pokedex/Pokedex"; // Importa il componente Pokedex
import AboutUs from "./components/About Us/AboutUs"; // Importa la pagina AboutUs

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trading-cards" element={<TradingCards />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/about-us" element={<AboutUs />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
