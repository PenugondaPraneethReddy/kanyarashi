import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
      theaterName : {
          type : String,
          required : true
      },
      city : {
          type : String,
          required : true
      },
      capacity : {
        type : Number,
        required : true
        },
      price : {
        type : Number,
        required : true
      }
  }
)

export default mongoose.model("Theatre", theaterSchema);
