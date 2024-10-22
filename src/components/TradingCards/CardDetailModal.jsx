import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CardDetailModal = ({ card, show, handleClose, addCardToCollection, collections }) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState(''); // Stato per la collezione selezionata

  const handleAddToCollection = () => {
    if (selectedCollectionId && card && card.id) {  // Assicurati che card.id sia presente
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
          <>
            <img src={card.images.large} alt={card.name} style={{ width: '100%' }} />
            <p>{card.name}</p>
            <p>{card.supertype} - {card.subtypes ? card.subtypes.join(', ') : 'N/A'}</p>
            <Form.Group>
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
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
        <Button variant="primary" onClick={handleAddToCollection}>
          Aggiungi alla Collezione
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardDetailModal;
