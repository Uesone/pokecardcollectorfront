import React from 'react';
import { Button } from 'react-bootstrap'; // Assicurati di importare 'Button'

// Assicurati che il componente CollectionList esista
const CollectionList = ({ collections, deleteCollection, setSelectedCollection, setShowModal }) => {
  return (
    <div style={styles.collectionGrid}>
      {collections.map((collection) => (
        <div key={collection.id} style={styles.collectionCard}>
          <h4>{collection.name}</h4>
          {/* Mostra le carte della collezione */}
          <div>
            {collection.cards && collection.cards.length > 0 ? (
              collection.cards.map((card) => (
                <div key={card.cardId}>
                  <img src={card.imageUrl} alt={card.name} style={{ width: '100px' }} />
                  <p>{card.name}</p>
                </div>
              ))
            ) : (
              <p>Nessuna carta nella collezione</p>
            )}
          </div>
          <Button variant="danger" onClick={() => deleteCollection(collection.id)}>Elimina</Button>
        </div>
      ))}
    </div>
  );
};

// Definisci gli stili se non esistono
const styles = {
  collectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
    marginTop: '20px',
  },
  collectionCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '200px',
  },
};

// Esportazione predefinita
export default CollectionList;
