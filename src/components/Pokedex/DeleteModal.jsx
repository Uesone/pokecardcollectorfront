import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ showModal, handleCloseModal, selectedCollection, deleteCollection }) => {
  const handleConfirmDelete = () => {
    deleteCollection(selectedCollection.id);
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Conferma Eliminazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sei sicuro di voler eliminare la collezione "{selectedCollection ? selectedCollection.name : ''}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Annulla</Button>
        <Button variant="danger" onClick={handleConfirmDelete}>Elimina</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
