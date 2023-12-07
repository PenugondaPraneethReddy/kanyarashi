import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllTheaters } from "../../helpers/api-helpers";
import CradLayout from "../HomePage/CradLayout";

const AllTheaters = () => {
  const [theaters, setTheaters] = useState();
  useEffect(() => {
    getAllTheaters()
      .then((data) => setTheaters(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin="auto" marginTop={4}>
      <Typography variant="h4" padding={2} textAlign="center">
        All Theaters
      </Typography>
      <Box
        margin="auto"
        width="100%"
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
        gap={4}
      >
        {theaters &&
          theaters.map((theater, index) => (
            <CradLayout
              id={theater._id}
              releaseDate={theater.city}
              title={theater.theaterName}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default AllTheaters;