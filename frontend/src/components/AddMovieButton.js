import React, { useState } from 'react';
import axios from 'axios';
import styles from '../AddMovie.module.css';


const AddMovie = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description || !rating || !imageUrl) {
      alert('Please provide all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/movies', {
        name,
        description,
        rating,
        image_url: imageUrl,
      });

      console.log('Movie added successfully:', response.data);
    } catch (error) {
      console.error('Error adding movie:', error.response?.data || error.message);
      // Show user-friendly error message
    }
  };

  return (
    <div className={styles.addMovieForm}>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter movie name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Enter movie description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input 
            type="number" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            placeholder="Enter rating (1-10)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input 
            type="url" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
