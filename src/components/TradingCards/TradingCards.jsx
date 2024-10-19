import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TradingCards.css";

const API_BASE_URL = "http://localhost:3001"; // Your backend URL

const TradingCards = () => {
  const [query, setQuery] = useState(""); // Search query for card name
  const [cards, setCards] = useState([]); // Holds the search results
  const [category, setCategory] = useState(""); // Category filter
  const [edition, setEdition] = useState(""); // Edition filter
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state for display

  // Function to handle card search
  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Reset error before making a request
    try {
      const response = await fetch(
        `${API_BASE_URL}/user/backoffice/cards/search?name=${query}&category=${category}&edition=${edition}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include JWT token
          },
        }
      );

      // Check if the response is OK
      if (response.ok) {
        const data = await response.json();
        
        // Debugging log
        console.log("Cards fetched:", data); 

        setCards(data); // Set the search results
      } else {
        setError("Failed to fetch cards. Please check the API.");
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("An error occurred while fetching cards.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Search Pokémon Cards</h1>

      {/* Search Form */}
      <div className="search-filters">
        <Form>
          <Form.Group controlId="query">
            <Form.Label>Card Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="basic">Basic</option>
              <option value="stage1">Stage 1</option>
              <option value="stage2">Stage 2</option>
              {/* Add more categories as necessary */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="edition">
            <Form.Label>Edition</Form.Label>
            <Form.Control as="select" value={edition} onChange={(e) => setEdition(e.target.value)}>
              <option value="">All Editions</option>
              <option value="base">Base</option>
              <option value="jungle">Jungle</option>
              {/* Add more editions as necessary */}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </div>

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading Indicator */}
      {loading && <p>Loading cards...</p>}

      {/* Cards Grid */}
      <Row className="mt-4">
        {cards.length === 0 && !loading && <p>No cards found.</p>} {/* Display if no cards */}
        {cards.map((card) => (
          <Col key={card.apiId} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={card.imageUrl} alt={card.name} />
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>Edition: {card.set}</Card.Text>
                <Card.Text>Rarity: {card.rarity}</Card.Text>
                <Button variant="success">Add to Collection</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TradingCards;
