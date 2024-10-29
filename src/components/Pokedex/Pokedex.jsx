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
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [totalCollectionValue, setTotalCollectionValue] = useState(0); // Nuovo stato per valore totale

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
      console.error('Error fetching collections:', error);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const createCollection = async () => {
    if (!newCollectionName.trim()) {
      setError('Cannot be empty.');
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
        setShowAddCollectionModal(false);
      } else {
        setError('Error adding collection');
      }
    } catch (error) {
      setError('Errore during collection creation.');
      console.error('Errore during collection creation.:', error);
    }
  };

  const openPokedex = () => {
    setIsClosing(false);
    setShowPokedex(true);
  };

  const closePokedex = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPokedex(false);
    }, 0);
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
        console.error('Error fetching cards data:', error);
        return card;
      }
    }));

    setCards(updatedCards);
    setSelectedCard(updatedCards[0]);


    const totalValue = updatedCards.reduce((acc, card) => {
      const cardPrice = card.details?.cardmarket?.prices?.averageSellPrice || 0;
      return acc + cardPrice;
    }, 0);
    setTotalCollectionValue(totalValue.toFixed(2)); 
  };

  useEffect(() => {
    if (cards.length > 0) {
      setSelectedCard(cards[selectedCardIndex]);
    }
  }, [selectedCardIndex, cards]);

  const deleteCollection = async (collectionId) => {
    const confirmDelete = window.confirm('Are you sure?');
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
          setTotalCollectionValue(0); 
        } else {
          console.error('Errore durante l\'eliminazione della collezione.');
        }
      } catch (error) {
        console.error('Errore durante l\'eliminazione della collezione:', error);
      }
    }
  };
  
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
        <p>Type: {selectedCard.details?.types?.join(', ') || 'N/A'}</p>
        <p>Rarity: {selectedCard.details?.rarity || 'N/A'}</p>
        <p>Set: {selectedCard.details?.set?.name || 'N/A'}</p>
        <p>Artist: {selectedCard.details?.artist || 'N/A'}</p>
        <p>Average Price: €{selectedCard.details?.cardmarket?.prices?.averageSellPrice || 'N/A'}</p>
      </div>
    );
  };

  const openCoinModal = () => setShowCoinModal(true);
  const closeCoinModal = () => setShowCoinModal(false);

  return (
    <div className="pokedex-container">
      <video autoPlay loop muted className="background-video">
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="centered-pokedex-button">
        {!showPokedex && (
          <button onClick={openPokedex} className="show-pokedex-button nes-pokeball">
          </button>
        )}
      </div>

      <div className={`pokedex-content ${showPokedex ? 'visible' : ''} ${isClosing ? 'close' : ''}`}>
        <div className="pokedex">
          <button className="close-pokedex-button" onClick={closePokedex}>✕</button>
          <div className="left-container">
            <div className="left-container__top-section">
              <div className="top-section__blue"></div>
              <div className="top-section__small-buttons">
                <div className="top-section__red"></div>
                <div className="top-section__yellow"></div>
                <div className="top-section__green"></div>
              </div>
              <div className="collection-dropdown-wrapper">
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

                {/* Icona coin come bottone */}
                <button onClick={openCoinModal} className="coin-button">
                  <i className="nes-icon coin is-medium"></i>
                </button>
              </div>
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

        {/* Modale per l'icona coin */}
        {showCoinModal && (
          <div className="coin-modal">
            <div className="coin-modal-content">
              <p>Total Value: €{totalCollectionValue}</p>
              <button onClick={closeCoinModal} className="close-coin-modal-button">
               Close
              </button>
            </div>
          </div>
        )}

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
      {error && <p className="error">{error}</p>}

      {/* Contenitore per i bottoni */}
      <div className="add-collection-modal-buttons">
        <button onClick={createCollection} className="create-collection-button">Create</button>
        <button onClick={() => setShowAddCollectionModal(false)} className="close-add-collection-modal-button">Close</button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Pokedex;
