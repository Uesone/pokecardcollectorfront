import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import axios from "axios";

const PokemonSearch = ({ collections, onAddCard }) => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState("");

  const searchCards = async () => {
    try {
      const response = await axios.get(`/api/pokemon/search?query=${query}`);
      setCards(response.data);
    } catch (error) {
      console.error("Errore nella ricerca delle carte:", error);
    }
  };

  const handleAddToCollection = async () => {
    if (selectedCollection && selectedCard) {
      try {
        await axios.post(`/api/collections/${selectedCollection}/addCard`, {
          cardId: selectedCard.id,
          imageUrl: selectedCard.images.small,
        });
        alert("Carta aggiunta con successo!");
        onAddCard();
      } catch (error) {
        console.error("Errore durante l'aggiunta della carta:", error);
      }
    } else {
      alert("Seleziona una collezione e una carta!");
    }
  };

  return (
    <div>
      <h2>Cerca carte Pokémon</h2>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Inserisci il nome della carta"
          />
        </Form.Group>
        <Button onClick={searchCards}>Cerca</Button>
      </Form>

      <Row>
        {cards.map((card) => (
          <Col key={card.id}>
            <Card onClick={() => setSelectedCard(card)}>
              <Card.Img src={card.images.small} />
              <Card.Body>{card.name}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedCard && (
        <div>
          <h3>Aggiungi "{selectedCard.name}" alla collezione</h3>
          <Form.Group>
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
          <Button onClick={handleAddToCollection}>Aggiungi alla collezione</Button>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
