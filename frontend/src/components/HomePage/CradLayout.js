import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Link } from "react-router-dom";
  import { useSelector } from "react-redux";
  const CradLayout = ({ title, description, releaseDate, posterUrl, id, upcoming }) => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  console.log("shakshi is admin loggedin:",isAdminLoggedIn);
    return (
      <Card
        sx={{
          width: 250,
          height: 320,
          borderRadius: 5,
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <img
          component="img"
          height="50%"
          width="100%"
          src={posterUrl}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          {isAdminLoggedIn && !upcoming && (<Button
            LinkComponent={Link}
            to={`/booking/${id}`}
            fullWidth
            variant="contained"
            sx={{
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
              borderRadius: 5,
            }}
          >
            Book Now
          </Button>)}
        </CardActions>
      </Card>
    );
  };
  
  export default CradLayout;