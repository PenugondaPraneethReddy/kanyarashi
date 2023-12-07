import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllTheaters, getTheatersByLocation } from "../../api-helpers/api-helpers";
import TheaterItem from "./TheaterItem";
import { useCity } from './../CityContext';
import { useSelector } from "react-redux";

const Theaters = () => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const [theaters, setTheaters] = useState();
  const {selectedCity, setSelectedCity} = useCity();
  useEffect(() => {
    if(selectedCity==''){
      getAllTheaters()
        .then((data) => setTheaters(data.theaters))
        .catch((err) => console.log(err));
    }
    else{
      getTheatersByLocation(selectedCity)
        .then((data) => setTheaters(data.theaters))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Theaters
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {theaters &&
          theaters.map((theater, index) => (
            <TheaterItem
              key={index}
              id={theater._id}
              city={theater.city}
              theaterName={theater.theaterName}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Theaters;