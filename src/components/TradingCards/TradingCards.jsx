import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const PokemonSearch = ({ collections, onAddCard }) => {
  const [query, setQuery] = useState(''); // Per memorizzare la query di ricerca
  const [cards, setCards] = useState([]); // Per memorizzare i risultati delle carte
  const [selectedCard, setSelectedCard] = useState(null); // Per memorizzare la carta selezionata
  const [selectedCollection, setSelectedCollection] = useState(''); // Collezione selezionata per aggiungere la carta

  // Funzione per cercare le carte
  const searchCards = async () => {
    try {
      const response = await axios.get(`/api/pokemon/search?query=${query}`);
      setCards(response.data); // Salva i risultati delle carte
    } catch (error) {
      console.error('Errore nella ricerca delle carte:', error);
    }
  };

  // Funzione per gestire il click su una carta (seleziona la carta)
  const handleCardClick = (card) => {
    setSelectedCard(card); // Seleziona la carta cliccata
  };

  // Funzione per aggiungere la carta selezionata a una collezione
  const handleAddToCollection = async () => {
    if (selectedCollection) {
      try {
        await axios.post(`/api/collections/${selectedCollection}/addCard`, {
          cardId: selectedCard.id,
          imageUrl: selectedCard.images.small,
        });
        alert('Carta aggiunta con successo!');
        onAddCard(); // Aggiorna la collezione nel parent component
      } catch (error) {
        console.error('Errore durante l\'aggiunta della carta:', error);
      }
    } else {
      alert('Seleziona una collezione!');
    }
  };

  return (
    <div>
      <h2>Cerca carte Pokémon</h2>
      <Form>
        <Form.Group controlId="formSearchQuery">
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Inserisci il nome della carta"
          />
        </Form.Group>
        <Button variant="primary" onClick={searchCards}>Cerca</Button>
      </Form>

      <Row className="mt-4">
        {cards.map((card) => (
          <Col key={card.id} xs={6} md={4} lg={3} className="mb-4">
            <Card onClick={() => handleCardClick(card)} style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={card.images.small} alt={card.name} />
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedCard && (
        <div className="add-to-collection mt-4">
          <h3>Aggiungi "{selectedCard.name}" alla collezione</h3>
          <Form.Group controlId="selectCollection">
            <Form.Label>Seleziona Collezione</Form.Label>
            <Form.Control
              as="select"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              <option value="">-- Seleziona una collezione --</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="success" onClick={handleAddToCollection}>Aggiungi alla collezione</Button>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
