import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import showtimes from "../models/showtimes.js";
import Movie from "../models/Movie.js";

// export const getShowtime = {(req,res) => {

//     }
// };
export const getShowtime = async (req,res) => {
  let shows;
  console.log('get showtimes');
  try {
    shows = await showtimes.find();
    console.log("shows in controller.js are ",shows);
  } catch (err) {
    return console.log(err);
  }
  if (!shows) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ shows });
};

// export const getMoviesFromShows = async(req,res) => {
//     let movies;
//     console.log('getting shows from movies');
// }