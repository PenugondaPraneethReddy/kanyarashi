import { Button, FormLabel, TextField, Typography, Select, MenuItem, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking, getAllTheaters } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({date: "", theater: "" });
  const id = useParams().id;
  console.log(id);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);


  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));

    getAllTheaters()
      .then((res) => setTheaters(res.theaters))
      .catch((err) => console.log(err));
  }, [id]);

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (selectedTheater && selectedTheater.capacity) {
      const newSeats = Array.from({ length: selectedTheater.capacity }, (_, index) => ({
        id: index + 1,
        status: 'available' // This could also be 'booked' if you have that info
      }));
      setSeats(newSeats);
    }
  }, [selectedTheater]);
  
  const handleSeatClick = (seatId) => {
    const selectedSeatsCount = seats.filter(seat => seat.status === 'selected').length;
    const isCurrentlySelected = seats.find(seat => seat.id === seatId).status === 'selected';
  
    if (selectedSeatsCount < 8 || isCurrentlySelected) {
      // Toggle seat selection
      const updatedSeats = seats.map(seat => seat.id === seatId
        ? { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' }
        : seat);
      setSeats(updatedSeats);
    } else {
      // Optionally alert the user that the maximum number of seats has been reached
      alert("You can select up to 8 seats.");
    }
  };
  
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setSelectedTheater(e.target.value);
  };
  const [theaters, setTheaters] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    const selectedSeatIds = seats.filter(seat => seat.status === 'selected').map(seat => seat.id);
    newBooking({ ...inputs, movie: movie._id, seats: selectedSeatIds })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets Of Movie: {movie.movieName}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.img}
                alt={movie.movieName}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.date).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
                  <FormLabel>Theater</FormLabel>
                  <Select
                    name="theater"
                    value={inputs.theater}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                    </MenuItem>
                    {theaters.map((theater, index) => (
                      <MenuItem key={index} value={theater}>{theater.theaterName}</MenuItem>
                    ))}
                  </Select>
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                  />
                  <Box marginBottom={5}></Box>
                  <FormLabel>Seat Selection</FormLabel>
                  <Box
                    sx={{
                      height: '50px', // Adjust the height as needed
                      backgroundColor: 'darkgray', // Screen color
                      borderRadius: '50px / 10px', // This creates the curved effect
                      textAlign: 'center',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginY: 2 // Adds vertical space around the screen
                    }}
                  >
                    <Typography variant="h6">Screen</Typography>
                  </Box>
                  <Box>
                    <Grid container spacing={1}>
                      {seats.map(seat => (
                        <Grid item key={seat.id}>
                          <Button
                            variant={seat.status === 'selected' ? 'contained' : 'outlined'}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={seat.status === 'booked'}
                          >
                            {seat.id}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;