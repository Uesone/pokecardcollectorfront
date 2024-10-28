import React, { useState, useEffect, useCallback } from 'react';
import './Pokedex.css';
import videoBg from "../../assets/pokemon-emerald-waterfall-pixel-moewalls-com.mp4";

const Pokedex = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [error, setError] = useState('');
  const [showPokedex, setShowPokedex] = useState(false);
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);

  const getToken = () => localStorage.getItem('jwtToken');

  const fetchCollections = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/collections/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error('Errore nel recupero delle collezioni:', error);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const createCollection = async () => {
    if (!newCollectionName.trim()) {
      setError('Il nome della collezione non può essere vuoto.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/collections/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name: newCollectionName }),
      });
      if (response.ok) {
        fetchCollections();
        setNewCollectionName('');
        setError('');
        setShowAddCollectionModal(false); // Chiudi il modale dopo la creazione
      } else {
        setError('Errore nella creazione della collezione.');
      }
    } catch (error) {
      setError('Errore durante la creazione della collezione.');
      console.error('Errore durante la creazione della collezione:', error);
    }
  };

  const deleteCollection = async (collectionId) => {
    const confirmDelete = window.confirm('Sei sicuro di voler cancellare questa collezione?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3001/api/collections/${collectionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
          },
        });
        if (response.ok) {
          fetchCollections();
          setSelectedCollection(null);
          setCards([]);
          setSelectedCardIndex(0);
        } else {
          console.error('Errore durante l\'eliminazione della collezione.');
        }
      } catch (error) {
        console.error('Errore durante l\'eliminazione della collezione:', error);
      }
    }
  };

  const selectCollection = async (collection) => {
    setSelectedCollection(collection);
    setCards(collection.cards);
    setSelectedCardIndex(0);

    const updatedCards = await Promise.all(collection.cards.map(async (card) => {
      try {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards/${card.cardId}`);
        if (!response.ok) {
          throw new Error(`Errore nella risposta dell'API: ${response.status}`);
        }
        const cardDetails = await response.json();
        return { ...card, details: cardDetails.data };
      } catch (error) {
        console.error('Errore nel recupero dei dettagli della carta:', error);
        return card;
      }
    }));

    setCards(updatedCards);
    setSelectedCard(updatedCards[0]);
  };

  useEffect(() => {
    if (cards.length > 0) {
      setSelectedCard(cards[selectedCardIndex]);
    }
  }, [selectedCardIndex, cards]);

  const handleNextCard = () => {
    if (selectedCardIndex < cards.length - 1) {
      setSelectedCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (selectedCardIndex > 0) {
      setSelectedCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  const renderCardImage = () => {
    if (!selectedCard) return null;
    return (
      <img
        src={selectedCard.details ? selectedCard.details.images.large : 'https://via.placeholder.com/96'}
        alt={selectedCard.details ? selectedCard.details.name : selectedCard.cardId}
        className="card-image"
      />
    );
  };

  const renderCardDetails = () => {
    if (!selectedCard) {
      return <p className="select-text">No Cards Found</p>;
    }
    return (
      <div className="card-details">
        <h3 className="poke-name">{selectedCard.details ? selectedCard.details.name : selectedCard.cardId}</h3>
        <p>HP: {selectedCard.details?.hp || 'N/A'}</p>
        <p>Tipo: {selectedCard.details?.types?.join(', ') || 'N/A'}</p>
        <p>Rarità: {selectedCard.details?.rarity || 'N/A'}</p>
        <p>Set: {selectedCard.details?.set?.name || 'N/A'}</p>
        <p>Artista: {selectedCard.details?.artist || 'N/A'}</p>
        <p>Prezzo di Mercato: €{selectedCard.details?.cardmarket?.prices?.averageSellPrice || 'N/A'}</p>
      </div>
    );
  };

  return (
    <div className="pokedex-container">
      <video autoPlay loop muted className="background-video">
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="centered-pokedex-button">
  {!showPokedex && (
    <button onClick={() => setShowPokedex(true)} className="show-pokedex-button">
      Pokédex
    </button>
  )}
</div>

      <div className={`pokedex-content ${showPokedex ? 'visible' : ''}`}>
        <div className="pokedex">
          <div className="left-container">
            <div className="left-container__top-section">
              <div className="top-section__blue"></div>
              <div className="top-section__small-buttons">
                <div className="top-section__red"></div>
                <div className="top-section__yellow"></div>
                <div className="top-section__green"></div>
              </div>
              <select
                className="collection-dropdown"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const collection = collections.find((col) => col.id.toString() === selectedId);
                  if (collection) {
                    selectCollection(collection);
                  }
                }}
                value={selectedCollection?.id || ''}
              >
                <option value="" disabled>Select a collection</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="left-container__main-section-container">
              <div className="left-container__main-section">
                <div className="main-section__white">
                  <div className="main-section__black">
                    {renderCardImage()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-container">
            <div className="right-container__black">
              <div className="right-container__screen">
                {renderCardDetails()}
              </div>
            </div>
            <div className="right-container__buttons">
              <button className="left-button" onClick={handlePrevCard}>Prev</button>
              <button className="right-button" onClick={handleNextCard}>Next</button>
            </div>
            <div className={`collection-buttons ${!selectedCollection ? 'solo-add-collection' : ''}`}>
  {selectedCollection && (
    <button
      className="delete-collection-button"
      onClick={() => deleteCollection(selectedCollection.id)}
    >
      Delete Collection
    </button>
  )}
  <button
    className="open-add-collection-modal-button"
    onClick={() => setShowAddCollectionModal(true)}
  >
    Add Collection
  </button>
</div>

          </div>
        </div>

        {showAddCollectionModal && (
          <div className="add-collection-modal">
            <div className="add-collection-modal-content">
              <h2>Create a Collection</h2>
              <input
                type="text"
                placeholder="Collection name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              <button onClick={createCollection} className="create-collection-button">Create</button>
              {error && <p className="error">{error}</p>}
              <button
                onClick={() => setShowAddCollectionModal(false)}
                className="close-add-collection-modal-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokedex;
