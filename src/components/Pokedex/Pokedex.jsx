import React, { useEffect, useState } from 'react';
import InputForm from './InputForm';
import CollectionList from './CollectionList';
import DeleteModal from './DeleteModal';

const Pokedex = () => {
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = 1; // Cambia con l'ID dell'utente corretto

  const fetchUserCollections = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/collections/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error('Errore nel recupero delle collezioni:', error);
    }
  };

  const createCollection = async () => {
    if (!collectionName.trim()) {
      setErrorMessage('Il nome della collezione non può essere vuoto.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/collections/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: collectionName }),
      });
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      fetchUserCollections();
      setCollectionName('');
      setErrorMessage('');
    } catch (error) {
      console.error('Errore nella creazione della collezione:', error);
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/collections/${collectionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      fetchUserCollections();
    } catch (error) {
      console.error('Errore nell\'eliminazione della collezione:', error);
    }
  };

  useEffect(() => {
    fetchUserCollections();
  }, []);

  return (
    <div style={styles.page}>
      <h1>Gestione Collezioni</h1>

      <InputForm
        collectionName={collectionName}
        setCollectionName={setCollectionName}
        createCollection={createCollection}
        errorMessage={errorMessage}
      />

      <CollectionList
        collections={collections}
        deleteCollection={deleteCollection}
        setSelectedCollection={setSelectedCollection}
        setShowModal={setShowModal}
      />

      <DeleteModal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        selectedCollection={selectedCollection}
        deleteCollection={deleteCollection}
      />
    </div>
  );
};

const styles = {
  page: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Pokedex;
