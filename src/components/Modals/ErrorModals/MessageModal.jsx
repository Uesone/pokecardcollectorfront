import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ show, handleClose, message, isError }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isError ? 'Error' : 'Success'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={isError ? 'danger' : 'success'} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
