import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = 'http://localhost:3001'; // Modifica con l'URL corretto

const TradingCards = ({ collectionId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [isHolo, setIsHolo] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/backoffice/cards/search?name=${searchQuery}&holo=${isHolo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Aggiungi il token JWT
        },
      });
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Errore nella ricerca delle carte:', error);
    }
  };

  const handleAddToCollection = async (cardId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/backoffice/collections/${collectionId}/addCard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Aggiungi il token JWT
        },
        body: JSON.stringify({
          cardId,
          quantity: 1, // Puoi modificare la quantità a seconda delle esigenze
          holo: isHolo,
          condition: 'Mint', // Puoi aggiungere un campo per la condizione
        }),
      });
      if (response.ok) {
        alert('Carta aggiunta alla collezione con successo!');
      } else {
        alert('Errore nell\'aggiunta della carta.');
      }
    } catch (error) {
      console.error('Errore nell\'aggiungere la carta alla collezione:', error);
    }
  };

  return (
    <Container>
      <h1>Ricerca Trading Cards</h1>
      <Form>
        <Form.Group controlId="searchQuery">
          <Form.Label>Nome Carta</Form.Label>
          <Form.Control
            type="text"
            placeholder="Cerca per nome"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="isHolo">
          <Form.Check
            type="checkbox"
            label="Solo carte olografiche"
            checked={isHolo}
            onChange={(e) => setIsHolo(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSearch}>
          Cerca
        </Button>
      </Form>

      <Row className="mt-4">
        {cards.map((card) => (
          <Col key={card.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={card.imageUrl} alt={card.name} />
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>Edizione: {card.set}</Card.Text>
                <Card.Text>Rarità: {card.rarity}</Card.Text>
                <Button variant="success" onClick={() => handleAddToCollection(card.apiId)}>
                  Aggiungi alla collezione
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TradingCards;
