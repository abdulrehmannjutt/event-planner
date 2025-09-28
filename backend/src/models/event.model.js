import mongoose from "mongoose";

const eventScheam = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
            trim: true,
        },
        date:{
            type: String,
            required: true,
        },
        category:{
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
)


export const EventModel = mongoose.model("Event", eventScheam);