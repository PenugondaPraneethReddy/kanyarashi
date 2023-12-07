import {
    Box,
    Button,
    Checkbox,
    FormLabel,
    TextField,
    Typography,
    InputAdornment,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { editTheater, getTheaterDetails } from "../../api-helpers/api-helpers";
  import { useNavigate } from "react-router-dom";
  const labelProps = {
    mt: 1,
    mb: 1,
  };
  const EditTheater = () => {
    const id = useParams().id;
    const [theater, setTheater] = useState();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      theaterName: "",
      city: "",
      capacity: "",
      price: "",
    });

    useEffect(() => {
      getTheaterDetails(id)
        .then((res) => setTheater(res.theater))
        .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
      if (theater) {
        setInputs({
          theaterName: theater.theaterName,
          city: theater.city,
          capacity: theater.capacity,
          price: theater.price,
        });
      }
    }, [theater]);

    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs);
      editTheater({ ...inputs, id: id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      alert("Movie Edit Successful");
      navigate('/');
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
              Edit Theater
            </Typography>
            <FormLabel sx={labelProps}>Theater Name</FormLabel>
            <TextField
              value={inputs.theaterName}
              onChange={handleChange}
              name="theaterName"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>City</FormLabel>
            <TextField
              value={inputs.city}
              onChange={handleChange}
              name="city"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Theater Capacity</FormLabel>
            <TextField
              type="number"
              value={inputs.capacity}
              onChange={handleChange}
              name="capacity"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Price</FormLabel>
            <TextField
              type="number"
              value={inputs.price}
              onChange={handleChange}
              name="price"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
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
              Done
            </Button>
          </Box>
        </form>
      </div>
    );
  };
  
  export default EditTheater;