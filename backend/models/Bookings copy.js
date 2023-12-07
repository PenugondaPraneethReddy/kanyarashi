import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  showtimeId: {
    type: mongoose.Types.ObjectId,
    ref: "Showtime", // Assuming you have a "Showtime" model
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["completed", "pending", "canceled"], // Define possible payment statuses
  },
});

export default mongoose.model("Booking", bookingSchema);
