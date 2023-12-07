import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies, getAllTheaters, getTheatersByLocation } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";
import TheaterItem from "./Theaters/TheaterItem";
import { useCity } from './CityContext';
import { useSelector } from "react-redux";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const {selectedCity, setSelectedCity} = useCity();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  useEffect(() => {
      getAllMovies()
        .then((data) => setMovies(data.movies))
        .catch((err) => console.log(err));
        console.log("shakshi....movies");
        console.log(movies);

    if(selectedCity==''){
      getAllTheaters()
        .then((data) => setTheaters(data.theaters))
        .catch((err) => console.log(err));
        console.log("shakshi...alltheaters.",theaters);
        console.log("homepage selected city:", selectedCity);
    }
    else{
      getTheatersByLocation(selectedCity)
        .then((data) => setTheaters(data.theaters))
        .catch((err) => console.log(err));
        console.log("shakshi...theaters.", theaters);
        console.log("homepage selected city:", selectedCity);
    }
  }, []);

  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"40vh"} padding={2} marginBottom={5}>
        <img
          src="https://media.istockphoto.com/id/521546846/photo/cinema-seat-and-pop-corn-facing-empty-movie-screen.jpg?s=612x612&w=0&k=20&c=7S3o2lPfbtLEk665Bmv62kZ3Dpr3BwWJ45sUS6CjhEU="//"https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
          //frontend/public/your-hero-background-image.jpg
          //frontend/src/components/HomePage.js
          alt="Brahmastra"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingY: 1,
          margin: 'auto',
          width: '80%',
        }}
      >
        <Typography variant="h4">
          Latest Movies
        </Typography>
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
      <hr style={{ width: '80%', border: '1px solid #ccc', marginTop: '20px', marginBottom: '20px' }} />
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        overflowX="auto" // Enables horizontal scrolling
        justifyContent={"flex-start"} // Align items to start
        alignItems="center"
        flexWrap="nowrap" // Changes wrapping to no wrap
        marginBottom={5}
      >
        {movies &&
          movies.slice(0, 4).map((movie, index) => (
            <MovieItem
              id={movie._id}
              title={movie.movieName}
              posterUrl={movie.img}
              releaseDate={movie.date}
              key={index}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingY: 1,
          margin: 'auto',
          width: '80%'
        }}
      >
        <Typography variant="h4">
          Theaters
        </Typography>
        <Button
          LinkComponent={Link}
          to="/theaters"
          variant="outlined"
          sx={{ color: "#2b2d42" }}
        >
          View All Theaters
        </Button>
      </Box>
      <hr style={{ width: '80%', border: '1px solid #ccc', marginTop: '20px', marginBottom: '20px' }} />
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        overflowX="auto"
        justifyContent={"flex-start"}
        alignItems="center"
        flexWrap="nowrap"
        marginBottom={5}
      >
        {theaters &&
          theaters.slice(0, 4).map((theater, index) => (
            <TheaterItem
              id={theater._id}
              theaterName={theater.theaterName}
              city={theater.city}
              key={index}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          ))}
      </Box>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingY: 1,
          margin: 'auto',
          width: '80%',
        }}
      >
        <Typography variant="h4">
          Upcoming Movies
        </Typography>
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ color: "#2b2d42" }}
        >
          View All Upcoming Movies
        </Button>
      </Box>
      <hr style={{ width: '80%', border: '1px solid #ccc', marginTop: '20px', marginBottom: '20px' }} />
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        overflowX="auto" // Enables horizontal scrolling
        justifyContent={"flex-start"} // Align items to start
        alignItems="center"
        flexWrap="nowrap" // Changes wrapping to no wrap
        marginBottom={5}
      >
        {movies &&
          movies.slice(0, 4).map((movie, index) => (
            <MovieItem
              id={movie._id}
              title={movie.movieName}
              posterUrl={movie.img}
              releaseDate={movie.date}
              key={index}
              isAdminLoggedIn={isAdminLoggedIn}
              upcoming={movie.isUpcoming}
            />
          ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingY: 1,
          margin: 'auto',
          width: '80%'
        }}
      >
  
    </Box>
    </Box>

  );
};

export default HomePage;