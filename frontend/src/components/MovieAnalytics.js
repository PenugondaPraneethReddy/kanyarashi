import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieListings = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log("testing movie use effect");
    const res = axios.get("/movie-analytics")
      .then((response) => {
        setMovies(response.data);
        console.log("data is ",response.data);
      })
      
      .catch((error) =>
        console.error("There was an error fetching movies:", error)
      );
      console.log("testing axios ",res);

  }, []);


  return (
    <div className="mainListing">
      <ul className="movies-list" style={{ listStyle: "none", display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <li key={movie._id} className="movie-tile" style={{ margin: "10px" }}>
            <img
              src={movie.img}
              alt={movie.movieName}
              className="movie-image"
              style={{ width: "200px", height: "auto" }}
            />
            <div style={{ marginLeft: "10px" }}>
              <h2>{movie.movieName}</h2>
              <p>Booked Seats: {movie.bookedseats}</p>
              <p>Total Seats: {movie.totalseats}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default MovieListings;
