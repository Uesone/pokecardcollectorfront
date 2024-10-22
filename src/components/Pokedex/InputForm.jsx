import React from 'react';
import { Button } from 'react-bootstrap';

const InputForm = ({ collectionName, setCollectionName, createCollection, errorMessage }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      createCollection();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nome della Collezione"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        onKeyDown={handleKeyDown}
        style={styles.input}
      />
      <Button onClick={createCollection} style={styles.button}>Crea Collezione</Button>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
    </div>
  );
};

const styles = {
  input: {
    padding: '10px',
    width: '300px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default InputForm;
