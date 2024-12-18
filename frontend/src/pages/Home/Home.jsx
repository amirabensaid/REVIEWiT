import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom"; // Add this import
import Hero from "../../components/Hero/Hero";
import Movies from "../../components/Movies/Movies";
import Footer from "../../components/Footer/Footer";
import { useGetAllMoviesMutation } from "../../slices/movieApiSlice";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [getAllMovies] = useGetAllMoviesMutation();
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    // Function to fetch all movies from your backend API
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies(); // Replace with your API endpoint URL
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Call the fetchMovies function to retrieve the movies
    fetchMovies();
  }, [getAllMovies]);

  // Function to handle button click
  const handleAddMovieClick = () => {
    navigate('/add-movie'); // Change this to the actual route for your add movie form
  };

  return (
    <>
      <div className="home">
        <Hero />
        
        <button onClick={handleAddMovieClick} className="add-movie-button">Add Movie</button>
        
        <Movies movies={movies} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
