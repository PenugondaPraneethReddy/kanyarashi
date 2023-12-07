import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: false,
  },
  theaterId: {
    type: mongoose.Types.ObjectId,
    ref: "Theatre", // Assuming you have a "Showtime" model
    required: true,
  },
  movieId:{
    type: mongoose.Types.ObjectId,
    ref: "Movie", // Assuming you have a "Showtime" model
    required: true,
  },
  seats: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Booking", bookingSchema);
