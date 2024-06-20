import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addMovie } from '../redux/actions';

const AddMovie = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const handleAddMovie = () => {
    if (title && genre) {
      addMovie({ title, genre });
      setTitle('');
      setGenre('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie title"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Movie genre"
      />
      <button onClick={handleAddMovie}>Add Movie</button>
    </div>
  );
};