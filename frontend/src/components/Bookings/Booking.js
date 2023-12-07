import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking, getAllTheaters, getShowtimes } from "../../api-helpers/api-helpers";
import { getTheatersByLocation, updateRewards, getUserDetails } from "../../api-helpers/api-helpers";
import { useCity } from "./../CityContext";
import { useSelector } from "react-redux";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ date: "", theater: "" });
  const id = useParams().id;
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedShowtimes, setSelectedShowtimes] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentSource, setPaymentSource] = useState("");
  const { selectedCity } = useCity();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const bookingSeatLimit = isUserLoggedIn ? 8 : 1;
  const [pricePerTicket, setPricePerTicket] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [AvailableRewards, setAvailableRewards] = useState(0);
  const [onlineServiceFees, setOnlineServiceFees] = useState(1.5);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // New state for showtimes
  const [showtimes, setShowtimes] = useState([
    // { time: "10:00 AM", id: 1 },
    // { time: "02:00 PM", id: 2 },
    // { time: "06:00 PM", id: 2 },
    // { time: "09:00 PM", id: 3 },
  ]);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));

    if (isUserLoggedIn) {
      getUserDetails()
        .then((res) => {
          if (res && res.user) {
            setUser(res.user);
            setAvailableRewards(res.user.rewards);
            const servicefee = res.user.membershipType === "premium" ? 0 : 1.5;
            setOnlineServiceFees(servicefee);
          }
        })
        .catch((err) => console.log(err));
    }

    if (selectedCity === "") {
      getAllTheaters()
        .then((res) => setTheaters(res.theaters))
        .catch((err) => console.log(err));
    } else {
      getTheatersByLocation(selectedCity)
        .then((res) => setTheaters(res.theaters))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const [seats, setSeats] = useState([]);

  // useEffect(() => {
  //   console.log("movie id in use effect is ",id);
  //   if (selectedTheater) {
  //     console.log("selected theatre is ", selectedTheater);
  //     getShowtimes(id, selectedTheater.id)
  //       .then((showtimes) => {
  //         console.log("showtimes are ", showtimes);
  //         setShowtimes(showtimes.movie.language);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     console.log('error in usecase');
  //   }
  //   // if(selectedTheater)
  //   //   console.log("selected theatre is ",selectedTheater);
  //   // else
  //   //   console.log('error in usecase');
  //   // getShowtimes(id,selectedTheater.id)
  //   // .then((showtimes) => {
  //   //     console.log("showtimes are ",showtimes)
  //   //     setShowtimes(showtimes)    //movie id
  //   //   }
  //   // )
  //   // //showtimes should contain the showtimes of a particular movie and a theatre.
  //   // .catch((err) => {console.log(err)})
  // },[id,selectedTheater]);

  // useEffect(() => {
  //   if (selectedTheater && selectedTheater.capacity) {
  //     const newSeats = Array.from({ length: selectedTheater.capacity }, (_, index) => ({
  //       id: index + 1,
  //       status: "available",
  //     }));
  //     setSeats(newSeats);
  //   }
  //   if (selectedTheater && selectedTheater.price) {
  //     console.log('dfkrkjfnr',selectedTheater)
  //     setPricePerTicket(selectedTheater.price);

  //   } else {
  //     setPricePerTicket(0);
  //   }
  // }, [selectedTheater]);
  useEffect(() => {
    console.log("movie id in use effect is ", id);
  
    if (selectedTheater) {
      console.log("selected theatre is ", selectedTheater);
      getShowtimes(id, selectedTheater._id)
        .then((showtimes) => {
          console.log("showtimes in booking.js are ", showtimes);
          console.log('theater is',selectedTheater);
          setShowtimes(showtimes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('error in usecase');
    }
  
    if (selectedTheater && selectedTheater.capacity) {
      const newSeats = Array.from({ length: selectedTheater.capacity }, (_, index) => ({
        id: index + 1,
        status: "available",
      }));
      setSeats(newSeats);
    }
  
    if (selectedTheater && selectedTheater.price) {
      console.log('dfkrkjfnr', selectedTheater);
      setPricePerTicket(selectedTheater.price);
    } else {
      setPricePerTicket(0);
    }
  }, [id,selectedTheater]);
  const handleOpenPaymentDialog = () => {
    const bookingDate = new Date(inputs.date);
    const isTuesday = bookingDate.getDay() === 1; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    console.log('uwdhjwked',isTuesday,bookingDate,inputs)
    if(isTuesday){
      setTotalPrice(seats.filter((seat) => seat.status === "selected").length * pricePerTicket/2 + onlineServiceFees);
    }
    else{
      setTotalPrice(seats.filter((seat) => seat.status === "selected").length * pricePerTicket + onlineServiceFees);
    }
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
  };

  const handlePaymentSourceChange = (event) => {
    setPaymentSource(event.target.value);
  };

  const handleFinalizeBooking = (e) => {
    e.preventDefault();

    try {
      const selectedSeatIds = seats.filter((seat) => seat.status === "selected").map((seat) => seat.id);

      if (
        paymentSource === "creditCard" ||
        (paymentSource === "rewards" && AvailableRewards >= TotalPrice * 10)
      ) {
        newBooking({ ...inputs, movie: movie._id, seats: selectedSeatIds, isUserLoggedIn })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        if (paymentSource === "rewards") {
          const newRewards = AvailableRewards - TotalPrice * 10 + TotalPrice;
          setAvailableRewards(newRewards);
          updateRewards(newRewards);
        } else {
          const newRewards = AvailableRewards + TotalPrice;
          setAvailableRewards(newRewards);
          updateRewards(newRewards);
        }

        handleClosePaymentDialog();
        alert(`Ticket Booked`);
        navigate("/movies");
      } else {
        alert(`Available Credits not Enough, Book with Credit Card`);
      }
    } catch {
      alert(`Ticket Booking Failed!`);
    }
  };

  const handleSeatClick = (seatId) => {
    const selectedSeatsCount = seats.filter((seat) => seat.status === "selected").length;
    const isCurrentlySelected = seats.find((seat) => seat.id === seatId).status === "selected";

    if (selectedSeatsCount < bookingSeatLimit || isCurrentlySelected) {
      const updatedSeats = seats.map((seat) =>
        seat.id === seatId
          ? { ...seat, status: seat.status === "selected" ? "available" : "selected" }
          : seat
      );
      setSeats(updatedSeats);
    } else {
      alert(`You can select up to ${bookingSeatLimit} seats.`);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "theater") {
      console.log('selected theatre in handle is',selectedTheater);
      setSelectedTheater(e.target.value);
    }
    if (e.target.name === "showtime") {
      console.log('selected showtimes in handle is',selectedTheater);
      setShowtimes(e.target.value);
    }
  };

  const [theaters, setTheaters] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSeatIds = seats.filter((seat) => seat.status === "selected").map((seat) => seat.id);
    newBooking({ ...inputs, movie: movie._id, seats: selectedSeatIds })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    handleClosePaymentDialog();
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign={"center"}>
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
              <img width="80%" height={"300px"} src={movie.img} alt={movie.movieName} />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.date).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box padding={5} margin={"auto"} display="flex" flexDirection={"column"}>
                  <FormLabel>Theater</FormLabel>
                  <Select
                    name="theater"
                    value={inputs.theater}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value=""></MenuItem>
                    {theaters.map((theater, index) => (
                      <MenuItem key={index} value={theater}>
                        {theater.theaterName}
                      </MenuItem>
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
                  <Box marginTop={3}>
                    <FormLabel>Showtimes:</FormLabel>
                    <Select
                      name="showtimes"
                      value={inputs.showtimes}
                      onChange={handleChange}
  
                    >
                      <MenuItem value="" disabled>
                        Select Showtime
                      </MenuItem>
                      {showtimes.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time.showStartTime}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>

                  <Box marginBottom={5}></Box>
                  <FormLabel>Seat Selection</FormLabel>
                  <Box
                    sx={{
                      height: "50px",
                      backgroundColor: "darkgray",
                      borderRadius: "50px / 10px",
                      textAlign: "center",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginY: 2,
                    }}
                  >
                    <Typography variant="h6">Screen</Typography>
                  </Box>
                  <Box>
                    <Grid container spacing={1}>
                      {seats.map((seat) => (
                        <Grid item key={seat.id}>
                          <Button
                            variant={seat.status === "selected" ? "contained" : "outlined"}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={seat.status === "booked"}
                          >
                            {seat.id}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Button type="button" sx={{ mt: 3 }} onClick={handleOpenPaymentDialog}>
                    Book Now
                  </Button>
                  <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog}>
                    <DialogTitle>Payment Information</DialogTitle>
                    <DialogContent>
                      <Typography variant="h6" sx={{ my: 2 }}>
                        Number of Tickets: {seats.filter((seat) => seat.status === "selected").length}
                        <br />
                        Price per Ticket: ${pricePerTicket}
                        <br />
                        Online Service Fees: ${onlineServiceFees}
                        <br/>
                        Total Price: ${TotalPrice}
                      </Typography>
                      <Select
                        value={paymentSource}
                        onChange={handlePaymentSourceChange}
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value=""></MenuItem>
                        {isUserLoggedIn && (
                          <MenuItem value="rewards">Rewards (Available:{AvailableRewards})</MenuItem>
                        )}
                        <MenuItem value="creditCard">Credit Card (xxxx xxxx xxxx xxxx)</MenuItem>
                      </Select>
                      <Button type="submit" sx={{ mt: 3 }} onClick={handleFinalizeBooking}>
                        Finalize Booking
                      </Button>
                    </DialogContent>
                  </Dialog>
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