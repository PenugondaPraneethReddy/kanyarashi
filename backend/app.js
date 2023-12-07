import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importing routes
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import theaterRouter from "./routes/theater-routes.js";
import locationRouter from "./routes/location-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import analyticsEndpoint from "./routes/analyticsEndpoint.js";
import showtimesRouter from "./routes/showtimes-routes.js";
// Using routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/theater", theaterRouter);
app.use("/locations", locationRouter);
app.use("/booking", bookingsRouter);
app.use("/showtimes",showtimesRouter);
app.use(analyticsEndpoint);

// MongoDB Connection
//const connectionString = 'mongodb+srv://movietheater$(process.env.MONGODB_PASSWORD):mongodb123@cluster0.jt5vmvj.mongodb.net/?retryWrites=true&w=majority';

//const connectionString ='mongodb+srv://movietheater:mongodb123@cluster0.jt5vmvj.mongodb.net/?retryWrites=true&w=majority';
const connectionString='mongodb+srv://praneeth:praneeth123@movietheatreapplication.4nmas7o.mongodb.net/movietheatreDB?retryWrites=true&w=majority';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(5001, () => {
    console.log("Server is running on port 5001");
  });
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

