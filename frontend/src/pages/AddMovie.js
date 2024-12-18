import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMovie = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send POST request to your API
      const response = await axios.post('http://localhost:5000/api/movies', {
        name,
        description,
        rating,
        imageUrl
      });
      
      console.log('Movie added successfully:', response.data);
      
      // Reset form fields and navigate back to home page
      setName('');
      setDescription('');
      setRating('');
      setImageUrl('');
      
      // Add this line to ensure navigation happens
      setTimeout(() => {
        navigate('/');
      }, 1000); // Adjust the timeout as needed
      
    } catch (error) {
      console.error('Error adding movie:', error.response?.data || error.message);
      
      if (error.response && error.response.status === 400) {
        // Handle bad request errors
        const errorMessage = error.response.data.message;
        alert(`Bad request: ${errorMessage}`);
      } else {
        // Handle other types of errors
        alert('An unexpected error occurred while adding the movie.');
      }
    }
  };

  return (
    <div className="add-movie">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Movie Name" 
          required />
        
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required />
        
        <input 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          placeholder="Rating" 
          required />
        
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
