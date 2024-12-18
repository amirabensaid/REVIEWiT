import asyncHandler from "express-async-handler";
import Movie from "../models/movieModel.js";

// @desc    Get all movies
// route GET /api/movies
// access public

const getMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(404);
    throw new Error("Server error : " + error.message);
  }
});

// @desc    Get one movie
// route GET /api/movies/:id
// access public

const getOneMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("reviews");
    res.status(200).json(movie);
  } catch (error) {
    res.status(404);
    throw new Error("Server error : " + error.message);
  }
});
const createMovie = asyncHandler(async (req, res) => {
  try {
    const { name, description, rating, image_url } = req.body;
    
    // Validate input
    if (!name || !description || !rating || !image_url) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const newMovie = await Movie.create({
      name,
      description,
      rating,
      image_url
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error creating movie:', error.message);
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: "Movie with this name already exists" });
    }
    res.status(500).json({ message: "Server error while creating movie" });
  }
});


export { getMovies, getOneMovie, createMovie };

