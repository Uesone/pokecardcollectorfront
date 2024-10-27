import React, { useState, useEffect, useCallback } from 'react'; 
import './Pokedex.css'; // Importiamo il file CSS per lo stile

const Pokedex = () => {
  const [collections, setCollections] = useState([]); 
  const [selectedCollection, setSelectedCollection] = useState(null); 
  const [cards, setCards] = useState([]); 
  const [selectedCard, setSelectedCard] = useState(null); 
  const [newCollectionName, setNewCollectionName] = useState(''); 
  const [error, setError] = useState(''); 

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

    const updatedCards = await Promise.all(collection.cards.map(async (card) => {
      try {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards/${card.cardId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Errore nella risposta dell'API: ${response.status}`);
        }
        const cardDetails = await response.json();
  
        if (!cardDetails.data || cardDetails.data.length === 0) {
          console.error('Dettagli della carta non trovati per:', card.cardId);
          return { ...card, details: null };
        }
  
        return { ...card, details: cardDetails.data }; 
      } catch (error) {
        console.error('Errore nel recupero dei dettagli della carta:', error);
        return card; 
      }
    }));
  
    setCards(updatedCards); 
    setSelectedCard(updatedCards[0]); 
  };

  const renderCardDetails = () => {
    if (!selectedCard) {
      return <p>Seleziona una carta dalla lista</p>;
    }
    return (
      <>
        <div className="image-container">
          <img
            src={selectedCard.details ? selectedCard.details.images.large : 'https://via.placeholder.com/96'}
            alt={selectedCard.details ? selectedCard.details.name : selectedCard.cardId}
            className="card-image"
          />
        </div>
        <div className="card-details">
          <h3>{selectedCard.details ? selectedCard.details.name : selectedCard.cardId}</h3>
          <p>HP: {selectedCard.details?.hp || 'N/A'}</p>
          <p>Tipo: {selectedCard.details?.types?.join(', ') || 'N/A'}</p>
          <p>Rarità: {selectedCard.details?.rarity || 'N/A'}</p>
          <p>Artista: {selectedCard.details?.artist || 'N/A'}</p>
        </div>
      </>
    );
  };

  const handleNextCard = () => {
    const currentIndex = cards.findIndex((card) => card.cardId === selectedCard.cardId);
    if (currentIndex < cards.length - 1) {
      setSelectedCard(cards[currentIndex + 1]);
    }
  };

  const handlePrevCard = () => {
    const currentIndex = cards.findIndex((card) => card.cardId === selectedCard.cardId);
    if (currentIndex > 0) {
      setSelectedCard(cards[currentIndex - 1]);
    }
  };

  return (
    <div className="pokedex-container">
      <div className="collection-selector">
        <h2>Seleziona una collezione</h2>
        <ul className="collection-list">
          {collections.length > 0 ? (
            collections.map((collection) => (
              <li key={collection.id} className={selectedCollection?.id === collection.id ? 'selected' : ''}>
                <span onClick={() => selectCollection(collection)}>{collection.name}</span>
                <button className="delete-button" onClick={() => deleteCollection(collection.id)}>
                  Cancella
                </button>
              </li>
            ))
          ) : (
            <p>Nessuna collezione disponibile</p>
          )}
        </ul>
        <div className="collection-creator">
          <input
            type="text"
            placeholder="Crea una collezione"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
          <button onClick={createCollection}>Crea</button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>

      <div className="pokedex">
        <div className="left-container">
          <div className="left-container__top-section">
            <div className="top-section__blue"></div>
            <div className="top-section__small-buttons">
              <div className="top-section__red"></div>
              <div className="top-section__yellow"></div>
              <div className="top-section__green"></div>
            </div>
          </div>
          <div className="left-container__main-section-container">
            <div className="left-container__main-section">
              <div className="main-section__white">
                <div className="main-section__black">
                  <div className="main-screen hide">
                    <div className="screen__header">
                      <span className="poke-name"></span>
                      <span className="poke-id"></span>
                    </div>
                    <div className="screen__image">
                      {renderCardDetails()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="left-container__controllers">
                <div className="controllers__d-pad">
                  <div className="d-pad__cell top"></div>
                  <div className="d-pad__cell left"></div>
                  <div className="d-pad__cell middle"></div>
                  <div className="d-pad__cell right"></div>
                  <div className="d-pad__cell bottom"></div>
                </div>
                <div className="controllers__buttons">
                  <div className="buttons__button">B</div>
                  <div className="buttons__button">A</div>
                </div>
              </div>
            </div>
            <div className="left-container__right">
              <div className="left-container__hinge"></div>
              <div className="left-container__hinge"></div>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="right-container__black">
            <div className="right-container__screen">
              <div className="card-list">
                {cards.length > 0 ? (
                  cards.map((card) => (
                    <div key={card.cardId} className="list-item" onClick={() => setSelectedCard(card)}>
                      {card.cardId}. {card.details ? card.details.name : 'Nome non disponibile'}
                    </div>
                  ))
                ) : (
                  <p>Non ci sono carte in questa collezione</p>
                )}
              </div>
            </div>
          </div>
          <div className="right-container__buttons">
            <button className="left-button" onClick={handlePrevCard}>Prev</button>
            <button className="right-button" onClick={handleNextCard}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
