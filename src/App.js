// App.js

import React from "react";
import CustomNavbar from "./components/CustomNavbar";

const App = () => {
  return (
    <div>
      <CustomNavbar />
      <div style={{ padding: "20px", color: "#333" }}>
        <h1>Welcome to Cardmarket</h1>
        <p>Explore our marketplace for trading card games.</p>
      </div>
    </div>
  );
};

export default App;
