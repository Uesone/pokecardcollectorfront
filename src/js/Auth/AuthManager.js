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
            return response.json(); // Dati utente restituiti dal backend
          }
          throw new Error("Errore durante la verifica del token");
        })
        .then((data) => {
          setIsLoggedIn(true); // Mantieni l'utente loggato
          setRole(data.role); // Imposta il ruolo dell'utente
        })
        .catch((error) => {
          console.error("Errore durante la verifica del token", error);
          setIsLoggedIn(false); // Imposta lo stato di non autenticato se ci sono errori
        });
    } else {
      setIsLoggedIn(false); // Se non c'è token, l'utente è sloggato
    }
  }, [setIsLoggedIn, setRole]);

  // Funzione di logout
  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Rimuove il token JWT
    setIsLoggedIn(false); // Aggiorna lo stato a sloggato
    setRole(""); // Resetta il ruolo
  };

  return { handleLogout };
};

export default AuthManager;
