import {
    Box,
    Button,
    FormLabel,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { addMovie } from "../../api-helpers/api-helpers";
  import { useNavigate } from "react-router-dom";
  const labelProps = {
    mt: 1,
    mb: 1,
  };
  const AddMovie = () => {
    const [inputs, setInputs] = useState({
      movieName: "",
      language: "",
      description: "",
      img: "",
      date: "",
      length: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs);
      addMovie(inputs)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      navigate('/movies');
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            width={"50%"}
            padding={10}
            margin="auto"
            display={"flex"}
            flexDirection="column"
            boxShadow={"10px 10px 20px #ccc"}
          >
            <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
              Add New Movie
            </Typography>
            <FormLabel sx={labelProps}>Title</FormLabel>
            <TextField
              value={inputs.movieName}
              onChange={handleChange}
              name="movieName"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Language</FormLabel>
            <TextField
              value={inputs.language}
              onChange={handleChange}
              name="language"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Description</FormLabel>
            <TextField
              value={inputs.description}
              onChange={handleChange}
              name="description"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Poster URL</FormLabel>
            <TextField
              value={inputs.img}
              onChange={handleChange}
              name="img"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Release Date</FormLabel>
            <TextField
              type={"date"}
              value={inputs.date}
              onChange={handleChange}
              name="date"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Length</FormLabel>
            <TextField
              value={inputs.length}
              onChange={handleChange}
              name="length"
              variant="standard"
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "30%",
                margin: "auto",
                bgcolor: "#2b2d42",
                ":hover": {
                  bgcolor: "#121217",
                },
              }}
            >
              Add New Movie
            </Button>
          </Box>
        </form>
      </div>
    );
  };
  
  export default AddMovie;