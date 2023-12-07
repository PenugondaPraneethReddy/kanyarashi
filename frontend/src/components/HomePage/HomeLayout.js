import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { getAllMovies } from '../../helpers/api-helpers';

const HomeLayout = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [openingThisWeekMovies, setOpeningThisWeekMovies] = useState([]);

  useEffect(() => {
    // Fetch Now Playing Movies
    getAllMovies() // You will need to adjust this to fetch the correct category
      .then((data) => setNowPlayingMovies(data))
      .catch((err) => console.log(err));

    // Fetch Opening This Week Movies
    getAllMovies() // You will need to adjust this to fetch the correct category
      .then((data) => setOpeningThisWeekMovies(data))
      .catch((err) => console.log(err));
  }, []);

  // Function to create movie cards
  const createMovieCards = (movies) => (
    movies.map((movie) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
        <Card>
          <CardMedia
            component="img"
            height="340"
            image={movie.posterUrl}
            alt={movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {movie.title}
            </Typography>
            {/* Placeholder for rating component */}
            <Typography variant="body2" color="text.secondary">
              Rating: {movie.rating} {/* Assuming you have a rating property */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      {/* Now Playing Section */}
      <Typography variant="h4" gutterBottom component="div">
        Now Playing
      </Typography>
      <Grid container spacing={4}>
        {createMovieCards(nowPlayingMovies)}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Button variant="contained" color="primary">
          See All
        </Button>
      </Box>
      
      {/* Opening This Week Section */}
      <Typography variant="h4" gutterBottom component="div">
        Opening This Week
      </Typography>
      <Grid container spacing={4}>
        {createMovieCards(openingThisWeekMovies)}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Button variant="contained" color="primary">
          See All
        </Button>
      </Box>
    </Box>
  );
};

export default HomeLayout;
