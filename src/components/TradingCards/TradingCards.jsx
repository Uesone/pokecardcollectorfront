import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap'; // Importiamo Modal
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
  const [showContent, setShowContent] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Stato per il modale di conferma

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
      console.log('Dati delle carte:', data);
      setCards(data);
      setShowCarousel(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
      setShowSuccessModal(true); // Mostra il modale di successo
      setTimeout(() => setShowSuccessModal(false), 2000); // Nasconde il modale dopo 2 secondi
    } catch (error) {
      console.error("Errore nell'aggiungere la carta:", error);
    }
  };

  return (
    <div style={styles.page} className="trading-cards-page">
      <video autoPlay loop muted className="background-video-fullscreen">
        <source src={videoBg} type="video/mp4" />
      </video>

      {showContent && (
        <div className="fade-in">
          <SearchBar onSearch={fetchPokemonCards} />
          {showCarousel && (
            <CardGrid cards={cards} onCardClick={handleCardClick} />
          )}
          <CardDetailModal
            card={selectedCard}
            show={showModal}
            handleClose={handleCloseModal}
            addCardToCollection={addCardToCollection}
            collections={collections}
          />

          {/* Modale di successo */}
          <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
            <Modal.Body style={{ textAlign: 'center', fontFamily: "'Press Start 2P', cursive", color:"lightgreen" }}>
              <p>Added Successfully!</p>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: "'Press Start 2P', cursive", 
  }
  
};

export default TradingCards;
