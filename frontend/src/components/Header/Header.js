import React, { useEffect, useState } from "react";
import { AppBar, Box, Tab, Tabs, TextField, Toolbar, IconButton } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import SearchIcon from "@mui/icons-material/Search"; // Import search icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import account icon
import { getAllMovies } from "../../helpers/api-helpers";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { adminActions } from "../../store/admin-slice";

const Header = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllMovies()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  const handleChange = (e, val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "orange" }}> {/* Change color to match the goal */}
      <Toolbar sx={{ justifyContent: 'space-between' }}> {/* Adjust to space out items */}
        
        {/* Logo on the left */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
            {/* Adjusted for larger logo */}
            <MovieCreationIcon sx={{ mr: 1 }} />
            <img src="/path-to-your-logo.png" alt="Logo" style={{ height: '40px' }} />
          </Link>
        </Box>
        
        {/* Centered search bar */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            // ... existing TextField props ...
            placeholder="Movie or theater" // Changed placeholder text
            sx={{ width: '60%', '& .MuiInputBase-root': { color: 'black', background: 'white', borderRadius: '20px' } }}
            InputProps={{
              startAdornment: (
                <IconButton position="start">
                  <SearchIcon />
                </IconButton>
              ),
              // ... other InputProps ...
            }}
          />
        </Box>
        
        {/* Navigation links on the right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tabs
            // ... existing Tabs props ...
            sx={{ '& .MuiTab-root': { color: 'black' } }} // Adjust tab color
          >
            {/* ... existing Tabs ... */}
          </Tabs>
          <IconButton color="inherit" component={Link} to="/profile">
            <AccountCircleIcon /> {/* Profile icon */}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;