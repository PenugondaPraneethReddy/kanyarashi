import mongoose from "mongoose";

const { Schema } = mongoose;

const screensSchema = new mongoose.Schema(
    {
        screen_no : {
            type : String,
            required : true
        },

        theatre_id : {
            type : Schema.Types.ObjectId,
            required : true
        },

        rows : {
            type : Number,
            required : true
        },

        cols : {
            type : Number,
            required : true
        },
    }
)


export default mongoose.model("screen", screensSchema);