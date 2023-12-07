import React, { useEffect, useState } from "react";
import { Select, MenuItem } from '@mui/material';
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies, fetchCities } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import { useCity } from './CityContext';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);
  const [cities, setCities] = useState([]);
  //const [selectedCity, setSelectedCity] = useState('');
  const {selectedCity, setSelectedCity} = useCity();


  useEffect(() => {
    fetchCities()
      .then(data => {
        setCities(data);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    window.location.reload()
    console.log("selected city:",event.target.value);
  };
  
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42"}}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon  style={{ color: 'white' }}/>
          </IconButton>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            displayEmpty
            sx={{ marginLeft: 1,  color: "white"}} // Adjust styling as needed
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {cities.map((city, index) => (
              <MenuItem key={index} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.movieName)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Across Multiple Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab label="Admin" LinkComponent={Link} to="/admin" />
                <Tab label="Auth" LinkComponent={Link} to="/auth" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="Profile" LinkComponent={Link} to="/user" />
                <Tab
                  onClick={() => logout(false)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Add Movie" LinkComponent={Link} to="/addmovie" />
                <Tab label="Add Theater" LinkComponent={Link} to="/addtheater" />
                <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
                <Tab label="Analytics" LinkComponent={Link} to="/movie-analytics" />
                <Tab label="Analytics" LinkComponent={Link} to="/location-analytics" />
                <Tab
                  onClick={() => logout(true)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;