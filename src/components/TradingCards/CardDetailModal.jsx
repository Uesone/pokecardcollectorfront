import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './CardDetailModal.css';

const CardDetailModal = ({ card, show, handleClose, addCardToCollection, collections }) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleAddToCollection = () => {
    if (selectedCollectionId && card && card.id) {
      addCardToCollection(selectedCollectionId, card);
      handleClose();
    } else {
      console.error("Seleziona una collezione e una carta valida.");
    }
  };

  const handleOpenDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
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
  <div className="image-container" onClick={handleOpenDetailModal} style={{ cursor: 'pointer' }}>
    <img src={card.images.large} alt={card.name} className="card-image" />
  </div>
</div>
          )}
        </Modal.Body>
        <Modal.Footer className="footer">
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

      <Modal show={showDetailModal} onHide={handleCloseDetailModal} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{card ? `${card.name} - Dettagli` : 'Dettagli Carta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {card && (
            <div className="details-container">
              <p><strong>HP:</strong> {card.hp || 'N/A'}</p>
              <p><strong>Tipo:</strong> {card.types ? card.types.join(', ') : 'N/A'}</p>
              <p><strong>Rarità:</strong> {card.rarity || 'N/A'}</p>
              <p><strong>Artista:</strong> {card.artist || 'N/A'}</p>
              <p><strong>Set:</strong> {card.set?.name || 'N/A'} ({card.set?.series || 'N/A'})</p>
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
