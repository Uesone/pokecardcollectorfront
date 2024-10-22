import React from 'react';

const CardGrid = ({ cards, onCardClick }) => {
  return (
    <div style={styles.cardGrid}>
      {cards.map((card) => (
        <div key={card.id} style={styles.card} onClick={() => onCardClick(card)}>
          <img src={card.images.small} alt={card.name} style={styles.image} />
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '150px',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
  },
};

export default CardGrid;
