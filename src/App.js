import React from "react";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import HomePage from "./components/Home/HomePage"; // Importiamo il componente della homepage

const App = () => {
  return (
    <div>
      <CustomNavbar />
      <HomePage /> {/* Aggiungiamo il componente HomePage */}
    </div>
  );
};

export default App;
