import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";
import Theater from "../models/Theater.js";
import showtimes from "../models/showtimes.js";
import screens from "../models/screens.js";
//import { getShowtime } from "./showtimes-controller.js";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, "mongodb123", (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new movie
  const { movieName, language, img, description, date, length } =
    req.body;
  if (
    !movieName &&
    movieName.trim() === "" &&
    !description &&
    description.trim() == ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      movieName,
      language,
      img,
      description,
      date: new Date(`${date}`),
      length,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    console.log(movie);
    //adminUser.addedMovies.push(movie);
    //await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
};

export const getshows = async (req, res) => {
  const { movieid, theaterid } = req.params;
  console.log('printing req in get movies', req.params);
  console.log('movie id is', movieid.toString());
  const show_list = await showtimes.find({ movieid: movieid });
  let shows = []
  let set = new Set();
  let j = 0;
  for (let i = 0; i < show_list.length; i++) {
    let screen = await screens.findById(show_list[i].screen_id);
    if (screen.theatre_id == theaterid && !set.has(show_list[i])) {
      set.add(show_list[i]);
      shows[j] = show_list[i];
      j++;
    }
  }
  console.log('shows are',shows);
  return res.status(200).json(shows);
  console.log('shows are', shows);
}

export const getAllMovies = async (req, res, next) => {
  let movies;
  console.log('get movies');
  try {
    movies = await Movie.find();
  } catch (err) {
    return console.log(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  console.log("shakshi movie by id:", id);
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    console.log("movie id not found");
    return res.status(404).json({ message: "Invalid Movie ID" });
  }
  console.log("movie:", movie);
  return res.status(200).json({ movie });
};

export const editMovies = async (req, res, next) => {
  const movieId = req.params.id;
  const { updatedData } = req.body;
  console.log("updateuser:", movieId, updatedData);

  try {
    const result = await Movie.findByIdAndUpdate(movieId, { ...updatedData }, { new: true });
    console.log("Updated Sucessfully:", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
    return console.log(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!movie) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};