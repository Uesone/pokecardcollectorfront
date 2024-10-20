import { useEffect } from "react";

const API_BASE_URL = "http://localhost:3001";

const AuthManager = ({ setIsLoggedIn, setRole }) => {
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
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
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn, setRole]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setRole("");
  };

  return { handleLogout };
};

export default AuthManager;
