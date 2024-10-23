import React, { useState, useEffect, useCallback } from 'react';
import './Pokedex.css'; // Importiamo il file CSS per lo stile

const Pokedex = () => {
  const [collections, setCollections] = useState([]); // Lista delle collezioni create dall'utente
  const [selectedCollection, setSelectedCollection] = useState(null); // Collezione selezionata
  const [cards, setCards] = useState([]); // Carte della collezione selezionata
  const [selectedCard, setSelectedCard] = useState(null); // Carta selezionata per visualizzazione dettagli
  const [newCollectionName, setNewCollectionName] = useState(''); // Nome per nuova collezione
  const [error, setError] = useState(''); // Per gestione errori

  // Funzione per ottenere il token JWT
  const getToken = () => localStorage.getItem('jwtToken');

  // Fetch per recuperare le collezioni dell'utente
  const fetchCollections = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/collections/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      setCollections(data); // Imposta le collezioni recuperate dal backend
    } catch (error) {
      console.error('Errore nel recupero delle collezioni:', error);
    }
  }, []);

  useEffect(() => {
    fetchCollections(); // Recupera collezioni dal backend all'avvio del componente
  }, [fetchCollections]);

  // Funzione per creare una nuova collezione
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
        fetchCollections(); // Aggiorna le collezioni dopo la creazione
        setNewCollectionName(''); // Reset dell'input
        setError(''); // Resetta eventuali errori
      } else {
        setError('Errore nella creazione della collezione.');
      }
    } catch (error) {
      setError('Errore durante la creazione della collezione.');
      console.error('Errore durante la creazione della collezione:', error);
    }
  };

  // Funzione per eliminare una collezione
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
          fetchCollections(); // Aggiorna le collezioni dopo l'eliminazione
          setSelectedCollection(null); // Resetta la collezione selezionata
          setCards([]); // Svuota la lista delle carte
        } else {
          console.error('Errore durante l\'eliminazione della collezione.');
        }
      } catch (error) {
        console.error('Errore durante l\'eliminazione della collezione:', error);
      }
    }
  };

  // Funzione per selezionare una collezione e visualizzare le carte
  const selectCollection = async (collection) => {
    setSelectedCollection(collection);
    setCards(collection.cards); // Imposta le carte della collezione selezionata

    // Fetch per ottenere i dettagli delle carte dalla API esterna
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
  
        // Se il formato dei dati non contiene le informazioni richieste, gestiamo un fallback
        if (!cardDetails.data || cardDetails.data.length === 0) {
          console.error('Dettagli della carta non trovati per:', card.cardId);
          return { ...card, details: null };
        }
  
        return { ...card, details: cardDetails.data }; // Unisce i dettagli della carta con i dati della collezione
      } catch (error) {
        console.error('Errore nel recupero dei dettagli della carta:', error);
        return card; // Ritorna la carta originale in caso di errore
      }
    }));
  
    setCards(updatedCards); // Aggiorna lo stato con le carte arricchite di dettagli
    setSelectedCard(updatedCards[0]); // Imposta la prima carta come selezionata di default
  };

  // Funzione per visualizzare l'immagine e i dettagli della carta
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

  // Funzione per navigare tra le carte della collezione (Prev/Next)
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
      {/* Selezione delle collezioni */}
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

      {/* Parte sinistra del Pokédex */}
      <div className="pokedex">
        <div className="left-container">
          <div className="left-container__main-section">
            <div className="screen">
              {renderCardDetails()} {/* Mostra immagine e dettagli */}
            </div>
          </div>
        </div>

        {/* Parte destra del Pokédex */}
        <div className="right-container">
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
