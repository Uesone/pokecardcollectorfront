import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CardDetailModal = ({ card, show, handleClose, addCardToCollection, collections }) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState(''); // Stato per la collezione selezionata

  const handleAddToCollection = () => {
    if (selectedCollectionId && card && card.id) {
      addCardToCollection(selectedCollectionId, card); // Aggiungi la carta alla collezione selezionata
      handleClose();
    } else {
      console.error("Seleziona una collezione e una carta valida.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{card ? card.name : 'Dettagli Carta'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {card && (
          <div style={styles.cardContainer}>
            {/* Immagine della carta */}
            <div style={styles.imageContainer}>
              <img
                src={card.images.large} // Immagine della carta
                alt={card.name}
                style={styles.cardImage}
              />
            </div>

            {/* Dettagli della carta */}
            <div style={styles.detailsContainer}>
              <h4>{card.name}</h4>
              <p><strong>ID:</strong> {card.id}</p>
              <p><strong>HP:</strong> {card.hp || 'N/A'}</p>
              <p><strong>Tipo:</strong> {card.types ? card.types.join(', ') : 'N/A'}</p>
              <p><strong>Rarità:</strong> {card.rarity || 'N/A'}</p>
              <p><strong>Artista:</strong> {card.artist || 'N/A'}</p>
              <p><strong>Set:</strong> {card.set?.name || 'N/A'} ({card.set?.series || 'N/A'})</p>
              <p><strong>Prezzo di mercato:</strong> {card.tcgplayer?.prices?.normal?.market ? `$${card.tcgplayer.prices.normal.market}` : 'N/A'}</p>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* Menu a tendina per la selezione della collezione */}
        <Form.Group style={{ flexGrow: 1, marginRight: '10px' }}>
          <Form.Label>Seleziona una collezione</Form.Label>
          <Form.Control
            as="select"
            value={selectedCollectionId}
            onChange={(e) => setSelectedCollectionId(e.target.value)}
          >
            <option value="">Seleziona una collezione</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Pulsante per aggiungere la carta alla collezione */}
        <Button variant="primary" onClick={handleAddToCollection} disabled={!selectedCollectionId}>
          Aggiungi alla Collezione
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Stili per il layout della carta
const styles = {
  cardContainer: {
    display: 'flex', // Disposizione in linea
    gap: '20px', // Distanza tra immagine e dettagli
    justifyContent: 'flex-start', // Allinea tutto a sinistra
  },
  imageContainer: {
    flex: '1', // Occupazione dello spazio per l'immagine
  },
  cardImage: {
    width: '100%', // L'immagine occupa tutto lo spazio del contenitore
    maxWidth: '200px', // Limite massimo per l'immagine
    borderRadius: '8px', // Arrotonda i bordi
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Aggiunge ombra
  },
  detailsContainer: {
    flex: '2', // Occupa più spazio per i dettagli
    textAlign: 'left', // Allinea il testo a sinistra
  },
};

export default CardDetailModal;
