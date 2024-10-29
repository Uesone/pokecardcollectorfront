// TradingCards.js
import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import CardGrid from './CardGrid';
import CardDetailModal from './CardDetailModal';
import videoBg from "../../assets/pokemon-emerald-title-screen-pixel-moewalls-com (trading-cards).mp4";
import './TradingCards.css';

const TradingCards = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [collections, setCollections] = useState([]);

  const getToken = () => localStorage.getItem('jwtToken');

  const fetchPokemonCards = async (query) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3001/api/pokemon/search?query=${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Errore nella ricerca delle carte Pokémon:', error);
    }
  };

  const fetchUserCollections = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:3001/api/collections/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error('Errore nel recupero delle collezioni:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserCollections();
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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cardId: card.id,
          imageUrl: card.images.small,
        }),
      });
      if (!response.ok) throw new Error(`Errore nell'aggiunta della carta: ${response.status}`);
      console.log('Carta aggiunta con successo!');
    } catch (error) {
      console.error('Errore nell\'aggiungere la carta:', error);
    }
  };

  return (
    <div style={styles.page} className="trading-cards-page">
      <video autoPlay loop muted className="background-video-fullscreen">
        <source src={videoBg} type="video/mp4" />
      </video>

      <h1>Pokémon Card Search</h1>
      <SearchBar onSearch={fetchPokemonCards} />
      <CardGrid cards={cards} onCardClick={handleCardClick} />
      <CardDetailModal
        card={selectedCard}
        show={showModal}
        handleClose={handleCloseModal}
        addCardToCollection={addCardToCollection}
        collections={collections}
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
