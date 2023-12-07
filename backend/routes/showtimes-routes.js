import express from "express";
import {
  getShowtime,
} from "../controllers/showtimes-controller.js";
const showtimesRouter = express.Router();
showtimesRouter.get("/", getShowtime);
//showtimesRouter.get("/:id", getMoviesFromShows);
//showtimesRouter.put("/:id", editMovies);
//showtimesRouter.post("/", addMovie);
//showtimesRouter.delete("/:id", deleteMovie);

export default showtimesRouter;