import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
  getbookingDetails,
  updateRewards,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();
  const [pricePerTicket, setPricePerTicket] = useState(0);
  const [booking, setBooking] = useState();
  const [bookingdeleted, setbookingdeleted] = useState(false);
  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);
  // const handleDelete = (id) => {
  //   deleteBooking(id)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
    
  //   //window.location.reload()
  // };
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  useEffect(() => {
    const processUpdate = async () => {
      if (bookingdeleted){
        const refund_rewards = booking.booking.seats.length * pricePerTicket * 10;
        const newRewards = user.rewards + refund_rewards;
        await updateRewards(newRewards);
        setbookingdeleted(false);

        await sleep(500);
        window.location.reload();
        alert('Refund is successful');
      }
    };

    processUpdate();
  }, [bookingdeleted, booking, pricePerTicket]);

  const handleDelete = (id) => {
    getbookingDetails(id)
      .then((res) => setBooking(res))
      .catch((err) => console.log(err));

    deleteBooking(id)
      //.then((res) => console.log(res))
      .then((res) => {
        setPricePerTicket(res.theater.price);
        setbookingdeleted(true);
      })
      .catch((err) => console.log(err));

    //window.location.reload()
  };

  const adjustDate = (dateStr) => {
    const parts = dateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months start at 0
    const day = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }


  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name: {user.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {user.email}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              MembershipType: {user.membershipType}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Rewards: {user.rewards}
            </Typography>
          </Box>
        )}
        {bookings && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie: {booking.movieId.movieName}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Theater: {booking.theaterId?.theaterName}
                    </ListItemText>
                    <ListItemText 
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Seat: {booking.seats.join(", ")}
                    </ListItemText>

                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Date: {adjustDate(booking.date).toLocaleDateString()}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;