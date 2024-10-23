import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const API_BASE_URL = "http://localhost:3001";

const AuthManager = ({ setIsLoggedIn, setRole }) => {
  const navigate = useNavigate(); // Inizializza il hook useNavigate

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetch(`${API_BASE_URL}/api/auth/me`, {
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
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn, setRole]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId"); // Rimuovi anche l'ID utente dal localStorage
    setIsLoggedIn(false);
    setRole("");
    navigate("/"); // Reindirizza alla pagina Home

    // Ricarica la pagina
    window.location.reload();
  };

  return { handleLogout };
};

export default AuthManager;
