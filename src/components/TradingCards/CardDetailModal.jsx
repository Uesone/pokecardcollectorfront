import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './CardDetailModal.css'; // Importa il file CSS

const CardDetailModal = ({ card, show, handleClose, addCardToCollection, collections }) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState(''); // Stato per la collezione selezionata
  const [showDetailModal, setShowDetailModal] = useState(false); // Stato per il secondo modale (dettagli carta)

  const handleAddToCollection = () => {
    if (selectedCollectionId && card && card.id) {
      addCardToCollection(selectedCollectionId, card); // Aggiungi la carta alla collezione selezionata
      handleClose();
    } else {
      console.error("Seleziona una collezione e una carta valida.");
    }
  };

  const handleOpenDetailModal = () => {
    setShowDetailModal(true); // Apre il secondo modale
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false); // Chiude il secondo modale
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{card ? card.name : 'Dettagli Carta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {card && (
            <div className="card-container">
              {/* Immagine della carta */}
              <div className="image-container" onClick={handleOpenDetailModal} style={{ cursor: 'pointer' }}>
                <img
                  src={card.images.large} // Immagine della carta
                  alt={card.name}
                  className="card-image"
                />
              </div>
              {/* Dettagli della carta sono stati rimossi dal primo modale */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="footer">
          {/* Menu a tendina per la selezione della collezione */}
          <Form.Group className="form-group">
            <Form.Control
              as="select"
              value={selectedCollectionId}
              onChange={(e) => setSelectedCollectionId(e.target.value)}
              className="select-input"
            >
              <option value="">Seleziona una collezione</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Pulsanti per aggiungere e chiudere */}
          <div className="button-container">
            <Button variant="primary" onClick={handleAddToCollection} disabled={!selectedCollectionId} className="add-button">
              Aggiungi
            </Button>
            <Button variant="secondary" onClick={handleClose} className="close-button">
              Chiudi
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Secondo modale per i dettagli della carta */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{card ? `${card.name} - Dettagli` : 'Dettagli Carta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {card && (
            <div className="details-container">
              <p><strong>ID:</strong> {card.id}</p>
              <p><strong>HP:</strong> {card.hp || 'N/A'}</p>
              <p><strong>Tipo:</strong> {card.types ? card.types.join(', ') : 'N/A'}</p>
              <p><strong>Rarità:</strong> {card.rarity || 'N/A'}</p>
              <p><strong>Artista:</strong> {card.artist || 'N/A'}</p>
              <p><strong>Set:</strong> {card.set?.name || 'N/A'} ({card.set?.series || 'N/A'})</p>
              <p><strong>Prezzo di mercato:</strong> {card.tcgplayer?.prices?.normal?.market ? `$${card.tcgplayer.prices.normal.market}` : 'N/A'}</p>
              {/* Altri dettagli della carta possono essere aggiunti qui */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardDetailModal;

