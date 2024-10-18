// AuthManager.js
import { useEffect } from "react";

const API_BASE_URL = "http://localhost:3001";

const AuthManager = ({ setIsLoggedIn, setRole }) => {
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Verifica il token con il backend
      fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Errore durante la verifica del token");
        })
        .then((data) => {
          setIsLoggedIn(true);
          setRole(data.role);
        })
        .catch((error) => {
          console.error("Errore durante la verifica del token", error);
          setIsLoggedIn(false);
        });
    }
  }, [setIsLoggedIn, setRole]);

  // Funzione di logout
  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Rimuove il token JWT
    setIsLoggedIn(false);
    setRole("");
  };

  return { handleLogout };
};

export default AuthManager;
