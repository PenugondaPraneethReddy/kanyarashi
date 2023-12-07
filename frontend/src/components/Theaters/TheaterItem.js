import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Link } from "react-router-dom";
  
  const TheaterItem = ({ theaterName, city, id, isAdminLoggedIn }) => {
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
        <img height={"50%"} width="100%" src={"https://wordpress.wbur.org/wp-content/uploads/2020/12/GettyImages-1150049038-1000x630.jpg"} alt={theaterName} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {theaterName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {city}
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
                to={`/edittheater/${id}`}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ bgcolor: 'red', '&:hover': { bgcolor: 'darkred' } }}
                LinkComponent={Link}
                to={`/deletetheater/${id}`}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              fullWidth
              LinkComponent={Link}
              to={`/movies`}
              sx={{
                margin: "auto",
                bgcolor: "#2b2d42",
                ":hover": {
                  bgcolor: "#121217",
                },
              }}
              size="small"
            >
              Explore
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };
  
  export default TheaterItem;