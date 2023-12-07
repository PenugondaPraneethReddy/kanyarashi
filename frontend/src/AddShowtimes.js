import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function AddShowtime() {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [theatreId, setTheatreId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const res = axios.get("/movie")
      .then((res) => {
        console.log("use effect movies ",res.data.movies)
        setMovies(res.data.movies);
      })
      .catch((error) =>
        console.log("There was an error fetching movies data", error)
      );
      //console.log('if theaters addshowtimes useffect',theatres);
    const res1 = axios.get("/theater")
      .then((res1) => {
          console.log('use effect theatres ',res1.data.theaters)
          setTheatres(res1.data.theaters);
      })
      .catch((error) =>
          console.log("There was an error fetching theatres data", error)
      );
  }, []);

  // useEffect(() => async () => {
  //   console.log('entered addshow theatre useffect');
  //   //if(theatres){
  //       console.log('if theaters addshowtimes useffect',theatres);
  //       const res = await axios.get("/theater")
  //       .then((res) => {
  //           console.log('res in theater addshowtimes',res.data.theaters)
  //           setTheatres(res.data.theaters);
  //       })
  //       .catch((error) =>
  //           console.log("There was an error fetching theatres data", error)
  //       );
  //   //}
  // }, [movies]);
//   useEffect(async () => {
//   console.log('entered addshow theatre useffect');
//   try {
//     const res = await axios.get("/theater");
//     console.log('res in theater addshowtimes', res.data.theaters);
//     setTheatres(res.data.theaters);
//   } catch (error) {
//     console.log("There was an error fetching theatres data", error);
//   }
// }, [theatres]);

  const getScreens = useCallback(async (event) => {
    console.log('entered getScreens');
    event.preventDefault();
    const data = event.target.value;
    console.log('event.target.value:', data);
    console.log('theatres array:', theatres);
    const theatre = theatres.find((item) => item.theatreName === data);
    console.log('getScreens theatre addshowtimes', theatres);
    setTheatreId(theatre ? theatre._id : '');
}, [theatres]);


  useEffect(() => {
    if (theatreId) {
      const res = axios.get(`/screens?theatreid=${theatreId}`)
        .then((res) => {
          console.log('res is',res);
          setScreens(res.data);
        })
        .catch((error) =>
          console.log("There was an error fetching screens data", error)
        );
    }
  }, [theatreId]);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({ m: "", t: "" });
  const token = localStorage.getItem("token");

  const registerApi = (body) => {
    return axios.post("/showtimes", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const onAddShowtime = useCallback(async (event) => {
    event.preventDefault();
    const data = event.target;
    const movieId = movies.find((item) => item.movieName === data.movieName.value)
      ._id;
    const screenId = screens.find(
      (item) => item.screen_no === data.screenNo.value
    )._id;
    const body = {
      movieid: movieId,
      showDate: data.showDate.value,
      showStartTime: data.showStartTime.value,
      price: data.price.value,
      screen_id: screenId,
    };

    try {
      const res = await registerApi(body);
      setMsg({ m: res.data.message, t: "success" });
      setOpen(true);
      alert("Showtime added successfully");
      setTimeout(() => navigate("/addshowtime"), 4000);
    } catch (e) {
      setMsg({ m: e.response.data.error, t: "error" });
      alert("Failure to add showtime");
      setOpen(true);
    }
  }, [movies, screens, navigate]);

  return (
    <>
      <div className="auth-container">
        <Typography variant="h2">Add Showtime</Typography>
        <form onSubmit={onAddShowtime}>
          <FormControl fullWidth>
            <InputLabel htmlFor="movieName">Select Movie</InputLabel>
            <Select name="movieName" onChange={getScreens}>
              {movies.map((movie) => (
                <MenuItem key={movie._id} value={movie.movieName}>
                  {movie.movieName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="date"
            name="showDate"
            placeholder="Show Date"
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            name="showStartTime"
            placeholder="Show Start Time"
            fullWidth
            margin="normal"
          />
          <TextField
            type="number"
            name="price"
            placeholder="Price"
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth>
          <InputLabel htmlFor="movieName">Select Movie</InputLabel>
            <Select name="movieName" onChange={getScreens}>
              {theatres.map((theatre) => (
                <MenuItem key={theatre._id} value={theatre.movieName}>
                  {theatre.movieName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="screenNo">Select Screen</InputLabel>
            <Select name="screenNo">
              {screens.map((screen) => (
                <MenuItem key={screen._id} value={screen.screen_no}>
                  {screen.screen_no}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddShowtime;