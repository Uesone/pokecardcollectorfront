import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import Home from "./components/Home/HomePage"; // Importa la pagina Home

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Aggiungi altre rotte per altre pagine */}
      </Routes>
    </Router>
  );
};

export default App;
