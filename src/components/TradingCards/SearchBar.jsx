import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Search Pokémon cards"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Search</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    marginLeft: '90px',
  },
  input: {
    padding: '10px',
    width: '300px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '13px',
  },
  button: {
    padding: '10px 20px',
    marginLeft: '10px',
    backgroundColor: '#f54291', // Colore brillante
    color: '#fff',
    border: '3px solid #222', // Bordo spesso per l’effetto retrò
    borderRadius: '2px',
    fontFamily: "'Press Start 2P', cursive", // Font anni '90 in stile pixel
    fontSize: '13px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    boxShadow: '2px 2px 0 #000', // Effetto ombra pixelata
    transition: 'all 0.2s ease-in-out',
  },
  buttonHover: {
    backgroundColor: '#ffca3a',
    boxShadow: '4px 4px 0 #000', // Maggiore ombra per effetto "premuto"
  },
};

export default SearchBar;
