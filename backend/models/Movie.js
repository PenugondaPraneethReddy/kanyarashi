import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  img: {
    type: String, // You can add validation or use a specific type for URLs if needed
    required: true,
  },
  status: {
    type: String,
    default: "finished",
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    default: "PG-13",
  },
  date: {
    type: Date,
    required: true,
  },
  length: {
    type: String, // Assuming duration is a string in hours (e.g., "2 hours")
    required: true,
  },
  featured: {
    type: Boolean,
  },
  
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  /*
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  */
});

export default mongoose.model("Movie", movieSchema);
