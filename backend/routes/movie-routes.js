import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  editMovies,
  deleteMovie,
  getshows,
} from "../controllers/movie-controller.js";

const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.put("/:id", editMovies);
movieRouter.post("/", addMovie);
movieRouter.delete("/:id", deleteMovie);
movieRouter.get("/:movieid/:theaterid", getshows);

export default movieRouter;