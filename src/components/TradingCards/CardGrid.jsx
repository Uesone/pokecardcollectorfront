import React, { useState, useEffect } from 'react';
import '../TradingCards/CardGrid.css';

const CardGrid = ({ cards, onCardClick }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardClasses, setCardClasses] = useState([]);

  useEffect(() => {
    const updatedClasses = cards.map((_, index) => {
      const distance = Math.abs(index - currentCardIndex);
      if (distance === 0) return 'we-card active';
      if (distance === 1) return index > currentCardIndex ? 'we-card next-1' : 'we-card prev-1';
      if (distance === 2) return index > currentCardIndex ? 'we-card next-2' : 'we-card prev-2';
      if (distance === 3) return index > currentCardIndex ? 'we-card next-3' : 'we-card prev-3';
      return 'we-card';
    });
    setCardClasses(updatedClasses);
  }, [currentCardIndex, cards]);

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="we-carousel">
      <div className="we-arrow left" onClick={handlePrev}>
        &#10094;
      </div>
      <div className="we-card-container">
        {cards.map((card, index) => (
          <div key={card.id} className={cardClasses[index]} onClick={() => onCardClick(card)}>
            <img src={card.images?.small} alt={card.name} className="we-card-image" />
            <p>{card.description}</p>
          </div>
        ))}
      </div>
      <div className="we-arrow right" onClick={handleNext}>
        &#10095;
      </div>
    </div>
  );
};

export default CardGrid;
