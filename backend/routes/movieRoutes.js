import express from "express";
const router = express.Router();
import { getMovies, getOneMovie, createMovie } from "../controllers/movieController.js";

router.get("/", getMovies);
router.get("/:id", getOneMovie);
router.post("/", createMovie);

export default router;
