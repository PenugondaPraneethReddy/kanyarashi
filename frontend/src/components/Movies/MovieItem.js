import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Link } from "react-router-dom";
  
  const MovieItem = ({ title, releaseDate, posterUrl, id,  isAdminLoggedIn, upcoming}) => {
    console.log("movie isadmimnloogin",isAdminLoggedIn);
    return (
      <Card
        sx={{
          margin: 2,
          width: 250,
          height: 320,
          borderRadius: 5,
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <img height={"50%"} width="100%" src={posterUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          {isAdminLoggedIn ? (
            <>
              <Button
                variant="contained"
                size="small"
                color="primary"
                sx={{ mr: 1 }}
                LinkComponent={Link}
                to={`/editmovie/${id}`}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ bgcolor: 'red', '&:hover': { bgcolor: 'darkred' } }}
                LinkComponent={Link}
                to={`/deletemovie/${id}`}
              >
                Delete
              </Button>
            </>
          ) : !upcoming && (
            <Button
              variant="contained"
              fullWidth
              LinkComponent={Link}
              to={`/booking/${id}`}
              sx={{
                margin: "auto",
                bgcolor: "#2b2d42",
                ":hover": {
                  bgcolor: "#121217",
                },
              }}
              size="small"
            >
              Book
            </Button>
          )}

        </CardActions>

      </Card>
    );
  };
  
  export default MovieItem;