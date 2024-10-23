import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import CardGrid from './CardGrid';
import CardDetailModal from './CardDetailModal';

const TradingCards = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [collections, setCollections] = useState([]);

  // Funzione per ottenere il token JWT
  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  // Funzione per cercare le carte
  const fetchPokemonCards = async (query) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3001/api/pokemon/search?query=${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Includi il token JWT nell'intestazione
        },
      });
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Errore nella ricerca delle carte Pokémon:', error);
    }
  };

  // Funzione per ottenere le collezioni dell'utente
  const fetchUserCollections = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:3001/api/collections/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Includi il token JWT nell'intestazione
        },
      });
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      const data = await response.json();
      setCollections(data); // Imposta le collezioni nel dropdown
    } catch (error) {
      console.error('Errore nel recupero delle collezioni:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserCollections(); // Recupera le collezioni dell'utente quando la pagina si carica
  }, [fetchUserCollections]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addCardToCollection = async (collectionId, card) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3001/api/collections/${collectionId}/addCard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Includi il token JWT nell'intestazione
        },
        body: JSON.stringify({
          cardId: card.id,  // Passa il cardId come parte del body JSON
          imageUrl: card.images.small,  // Passa imageUrl come parte del body JSON
        }),
      });
      if (!response.ok) {
        throw new Error(`Errore nell'aggiunta della carta: ${response.status}`);
      }
      console.log('Carta aggiunta con successo!');
    } catch (error) {
      console.error('Errore nell\'aggiungere la carta:', error);
    }
  };

  return (
    <div style={styles.page}>
      <h1>Pokémon Card Search</h1>
      <SearchBar onSearch={fetchPokemonCards} />
      <CardGrid cards={cards} onCardClick={handleCardClick} />

      <CardDetailModal
        card={selectedCard}
        show={showModal}
        handleClose={handleCloseModal}
        addCardToCollection={addCardToCollection}
        collections={collections} // Passa le collezioni all'interno del modale
      />
    </div>
  );
};

const styles = {
  page: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default TradingCards;
